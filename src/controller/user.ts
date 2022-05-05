import { Inject, Controller, Get, Param } from '@midwayjs/decorator';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { UserService } from '../service/user';

@Controller('/api/user')
export class APIController {
  @Inject()
  userService: UserService;

  @Get('/:uid', { middleware: [JwtPassportMiddleware] })
  async getUser(@Param('uid') uid: number) {
    const user = await this.userService.getUser({ uid: uid });
    return { success: true, message: 'OK', data: user };
  }
}
