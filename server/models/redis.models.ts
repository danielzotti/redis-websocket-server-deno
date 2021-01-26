export interface RedisClient {
  sessionId: string;
  date: number;
}

export interface RedisMessage {
  command: string; // 'unknown';
  output: any; // 'Invalid JSON';
  status: string; // 'error';
}
