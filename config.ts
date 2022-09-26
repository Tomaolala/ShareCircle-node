import { ConfigOptions } from './snow/configuration';

const config: ConfigOptions = {
  port: 8901,
  rootPath: '/api',
  database: {
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'iot_share',
  },
};

export default config;
