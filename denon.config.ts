import { DenonConfig } from './deps.ts';

const config: DenonConfig = {
  scripts: {
    dev: {
      cmd: 'denon run --unstable --allow-net --allow-read server/app.ts',
      desc: 'DEVELOPMENT: Run my server/app.ts file on port 3000',
    },
    start: {
      cmd: 'deno run --unstable --allow-net --allow-read server/app.ts',
      desc: 'PRODUCTION: Run my server/app.ts file on port PORT',
    },
  },
};

export default config;
