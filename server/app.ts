import { config } from '../deps.ts';
import { redisWebsocketService } from './redis-websocket.ts';

const env = config();

redisWebsocketService(env.REDIS_HOST, parseInt(env.REDIS_PORT), parseInt(env.PORT));
