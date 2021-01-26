// import { acceptable, acceptWebSocket, serve } from '../deps.ts';
import { serve } from '../deps.ts';

const port = 3000;
const server = serve({ port });

console.log(`Server listening on http://localhost:${ port }`);

for await (const req of server) {
  console.log('URL request: ', req.url);
  if(req.url === '/') {
    req.respond({
      status: 200,
      body: 'Welcome to Deno(n) server!'
    });
  }

  // if(req.url ==='/') {
  //   if (acceptable(req)) {
  //     acceptWebSocket({
  //       conn: req.conn,
  //       bufReader: req.r,
  //       bufWriter: req.w,
  //       headers: req.headers,
  //     }).then()
  //   }
  // }
}
