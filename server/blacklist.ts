const commandBlackList = [
//cluster
  'CLUSTER', // *
  'READONLY',
  'READWRITE',

//connection
  'AUTH',
  'QUIT',
  'SELECT',
  'SWAPDB',

//Keys
  'OBJECT',
  'DUMP',
  'MIGRATE',
  'MOVE',
  'RESTORE',
  'WAIT',

//Scripting
  'EVAL',
  'EVALSHA',
  'SCRIPT',//*

//Server
  'BGREWRITEAOF',
  'BGSAVE',
  'CLIENT',//*
  'COMMAND',//*
  'CONFIG',//*
  'DBSIZE',
  'DEBUG',//*
  'FLUSHALL',
  'FLUSHDB',
  'INFO', // (or limit it)
  'MEMORY', //*
  'MONITOR',
  'ROLE',
  'SAVE',
  'SHUTDOWN',
  'SLAVEOF',
  'REPLICAOF',
  'SLOWLOG',
  'SYNC',
  'TIME',

//Streams
//(tbd)

//Transactions
  'WATCH',
  'UNWATCH',
];

export const isAllow = (command?: string) => {
  return command ? (!commandBlackList.includes(command.toUpperCase())) : false;
};
