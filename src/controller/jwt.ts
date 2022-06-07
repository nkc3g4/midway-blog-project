import { Post, Body, Inject, Controller } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { User } from '../interface';
import { verify } from 'hcaptcha';
import * as fs from 'node:fs';

@Controller('/auth')
export class JwtController {
  @Inject()
  jwt: JwtService;

  @Inject()
  ctx: Context;

  @Post('/passport/jwt', { middleware: [JwtPassportMiddleware] })
  async jwtPassport() {
    console.log('jwt user: ', this.ctx.state.user);
    return this.ctx.state.user;
  }

  @Post('/login')
  async authGenJwt(@Body() user: User) {
    const secret = fs.readFileSync(__dirname + '\\hsecret.key').toString();
    const token = user.htoken;

    return verify(secret, token)
      .then(async data => {
        if (data.success === true) {
          console.log('success!', data);
          if (user.id === 1 && user.password === 'dddd') {
            console.log('login success');
            return {
              t: await this.jwt.sign({ uid: user.id, msg: 'Hello Midway' }),
              rt: await this.jwt.sign(
                { uid: user.id, msg: 'Hello Midway' },
                { expiresIn: '2d' }
              ),
            };
          } else {
            return { code: -1 };
          }
        } else {
          console.log('verification failed');
          return { code: -1 };
        }
      })
      .catch(console.error);
  }

  @Post('/loginrefresh')
  async authRefresh(@Body() rt: string, userid: string) {
    this.jwt.verify(rt).then(async () => {
      return {
        t: await this.jwt.sign({ uid: userid, msg: 'Hello Midway' }),
        rt: await this.jwt.sign(
          { uid: userid, msg: 'Hello Midway' },
          { expiresIn: '2d' }
        ),
      };
    });
  }

  @Post('/jwt')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
      // rt: await this.jwt.sign([])
    };
  }
}
