import { connect, WebSocket, WebSocketServer } from '../deps.ts';
import { isAllow } from './blacklist.ts';
import { RedisClient, RedisMessage } from './models/redis.models.ts';

export const redisWebsocketService = (redisHostname: string, redisPort: number, webSocketPort: number) => {

  const wss = new WebSocketServer(webSocketPort);
  console.log('Start WebSocket.Server on: %s', webSocketPort);

  const createRedisClient = async (data: RedisClient) => {
    const sessionId = data.sessionId ? data.sessionId : 'xxxx';
    const client = await connect({
      hostname: redisHostname || '127.0.0.1',
      port: redisPort | 6379,
    });
    console.log('Create new Redis client with prefix: %s', sessionId);
    return client;
  };

  const heartbeat = function() {
    console.log('pong heartbeat...');
  };


  wss.on('connection', function connection(ws: WebSocket) {

    ws.on('pong', heartbeat);

    ws.on('ping', console.info);

    ws.on('error', console.error);

    ws.on('open', () => {
      console.log('open');
    });

    ws.on('close', () => {
      console.log('close');
    });

    ws.on('message', async (event: string) => {
      console.log('message: %s', event);
      let redis;
      let request: RedisMessage & RedisClient;
      let defaultResponse: RedisMessage = {
        command: 'unknown',
        output: 'Invalid JSON',
        status: 'error'
      };
      let response: RedisMessage = { ...defaultResponse };

      try {
        request = JSON.parse(event);
      } catch(ex) {

        return ws.send(JSON.stringify(defaultResponse));
      }

      try {
        redis = await createRedisClient(request);

        const commandString = request.command;
        const commandArray = commandString?.split(/(\w+|"[^"]+["])/g).filter(i => i.trim() !== '');
        const command = commandArray ? commandArray[0] : '';
        const args = commandArray ? commandArray.slice(1) : [];

        response.command = commandString;
        if(!isAllow(command)) {
          throw new Error('Command not allowed');
        }
        const redisRawReply = await redis.executor.exec(command, ...args);
        // response.status = redisRawReply[0] || '';
        response.status = 'ok'; // to be compliant with the client
        response.output = redisRawReply[1] || ''; // TODO: improve this behavior!
      } catch(ex) {
        console.log('Exception on send_command');
        response.status = 'error';
        response.output = ex.message;
      } finally {
        redis?.close();
      }
      return ws.send(JSON.stringify(response));
    });
  });
};
