import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async getUser(options: IUserOptions) {
    const firstUser = await this.userModel.findOne({
      where: {
        uid: options.uid,
      },
    });
    console.log(firstUser);
    return firstUser;
    // return {
    //   uid: options.uid,
    //   username: 'mockedName',
    //   phone: '12345678901',
    //   email: 'xxx.xxx@xxx.com',
    // };
  }
}
