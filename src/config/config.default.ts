import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1650253158736_2775',
  koa: {
    port: 7001,
  },
  orm: {
    /**
     * 单数据库实例
     */
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: false,
  },
  jwt: {
    secret: 'xxxxxxxxxxxxxx', // fs.readFileSync('xxxxx.key')
    expiresIn: '1m', // https://github.com/vercel/ms
  },
  cors: {
    credentials: false,
    origin: '*',
  },
} as MidwayConfig;
