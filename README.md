# Redis Websocket Server with Deno
Porting of the devmy [redis-websocket-server](https://github.com/acadevmy/redis-websocket-server) in **deno**

## Local development

Run `docker-compose -f docker-compose.local.yml up --build`

## Production

[TODO]


### Bugs

Denon doesn't kill processes if `denon.config.ts file` is used. See [issue 49](https://github.com/denosaurs/denon/issues/49) 
