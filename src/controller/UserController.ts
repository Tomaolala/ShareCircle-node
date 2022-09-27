import { Body, Controller, Get, Post, Query } from '@snow';
import { UserDao } from '../dao/UserDao';

@Controller('/user')
export default class UserController {
  private readonly userDao = new UserDao();

  @Post('/addUser')
  async addUser(@Body() body) {
    return await this.userDao.insert(body);
  }

  @Post('/findUserById')
  async findUser(@Query('id') id) {
    return await this.userDao.selectById(id);
  }

  @Post('/findUserList')
  async findUserList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.userDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'createDate' });
  }

  @Post('/editUser')
  async editUser(@Body() body) {
    return await this.userDao.update(body.id, body);
  }

  @Post('/deleteUser')
  async deleteUser(@Query('id') id) {
    return await this.userDao.deleteById(id);
  }
}
