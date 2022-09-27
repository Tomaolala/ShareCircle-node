import { ConfigOptions } from './snow/configuration';

const config: ConfigOptions = {
  port: 8901,
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
