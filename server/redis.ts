import { isWebSocketCloseEvent, v4, WebSocket } from '../deps.ts';


let sockets = new Map<string, WebSocket>();

export const redisConnection = async (ws: WebSocket) => {
  console.log('new socket connection');

  // Add new websocket connection to map
  const uuid = v4.generate();
  sockets.set(uuid, ws);

  for await (const eventString of ws) {
    console.log({ event: eventString });

    if(isWebSocketCloseEvent(eventString)) {
      sockets.delete(uuid)
    }

    if(typeof eventString === 'string') {
      try {
        const event = JSON.parse(eventString);
        console.log({ event });
      } catch(ex) {
        console.log('Cannot parse event object!');
      }
    }
  }
};
