import { MidwayConfig } from '@midwayjs/core';
import * as fs from 'node:fs';

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
    synchronize: false,
    logging: false,
  },
  jwt: {
    secret: fs.readFileSync(__dirname + '\\jwtsecret.key').toString(),
    expiresIn: '1d', // https://github.com/vercel/ms
  },
  cors: {
    credentials: false,
    origin: '*',
  },
  oss: {
    // normal oss bucket
    client: {
      accessKeyId: fs.readFileSync(__dirname + '\\accid.key').toString(),
      accessKeySecret: fs
        .readFileSync(__dirname + '\\accsecret.key')
        .toString(),
      bucket: 'luobotou-beijing',
      endpoint: 'oss-cn-beijing.aliyuncs.com',
      timeout: '60s',
    },
  },
} as unknown as MidwayConfig;
