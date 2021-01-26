import { acceptable, acceptWebSocket, config, serve } from '../deps.ts';
import { redisConnection } from './redis.ts';

console.log('.env -> ',config());

const env = config()

const port = parseInt(env.PORT) || 3001;
const server = serve({ port });

console.log(`Server listening on http://localhost:${ port }`);

for await (const req of server) {
  console.log('URL request: ', req.url);
  if(req.url === '/test') {
    req.respond({
      status: 200,
      body: 'Welcome to Deno server!'
    });
  }

  if(req.url === '/') {
    if(acceptable(req)) {
      acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      }).then(redisConnection);
    }
  }
}
