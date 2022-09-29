import { Body, Controller, Get, Post, Query } from '@snow';
import { CustomError } from '@snow/excption/index';
import { AccountDao } from '../dao/AccountDao';
import { UserDao } from '../dao/UserDao';

const getDays = (ctime) => {
  return Math.ceil(Math.abs(new Date().getTime() - new Date(ctime).getTime()) / 86400000);
};

@Controller('/user')
export default class UserController {
  private readonly userDao = new UserDao();
  private readonly accountDao = new AccountDao();

  // 注册
  @Post('/addUser')
  async addUser(@Body() user) {
    const ctime = new Date();
    await this.accountDao.insert({
      ctime,
      id: await this.userDao.insert({ ctime, role: '2', ...user }),
    });
    const userInfo = await this.userDao.selectOne(user);
    const days = getDays(userInfo.ctime);

    return { days, ...userInfo[0] };
  }

  @Get('/findUserById')
  async findUser(@Query('id') id) {
    const info = await this.userDao.selectById(id);
    const days = getDays(info.ctime);
    return { days, ...info };
  }

  @Post('/findUserList')
  async findUserList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.userDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'id' });
  }

  // 修改密码
  @Post('/editUser')
  async editUser(@Body() user) {
    return await this.userDao.update(user.id, user);
  }

  @Post('/deleteUser')
  async deleteUser(@Query('id') id) {
    return await this.userDao.deleteById(id);
  }

  // 登录
  @Post('/login')
  async login(@Body() body) {
    const { userPhone, password } = body;
    const user = await this.userDao.login(userPhone, password);

    if (user.length) {
      const days = getDays(user[0].ctime);
      return { days, ...user[0] };
    } else {
      // @code
      throw new CustomError(200, '密码错误！');
    }
  }
}
