import { ConfigOptions } from './snow/configuration';

const config: ConfigOptions = {
  port: 9999,
  rootPath: '/api',
  database: {
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'bikedb',
  },
};

export default config;
