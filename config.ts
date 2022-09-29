import { ConfigOptions } from './snow/configuration';

const config: ConfigOptions = {
  port: 8901,
  rootPath: '/api',
  database: {
    host: '127.0.0.1',
    port: 3306,
    username: 'iot_share',
    password: 'i62EYm6c8NsH2GFr',
    database: 'iot_share',
  },
};

export default config;
