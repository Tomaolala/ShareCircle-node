import { Body, Controller, Get, Post, Query } from '@snow';
import { UserDao } from '../dao/UserDao';

@Controller('/user')
export default class UserController {
  private readonly userDao = new UserDao();
  
  @Post('/addUser')
  async addUser(@Body() user) {
    return await this.userDao.insert(user);
  }
  @Post('/userLogin')
  async userLogin(@Body() user) {
    let res = await this.userDao.selectById(user.id);
    if (!res)
      return {
        msg: '账号不存在',
      };
    else if (res.password === user.password) {
      if(res.role=="user"){
        return {
          msg: 'user',
        };
      }else{
        return {
          msg:"admin"
        }
      }
    } else
      return {
        msg: '密码错误',
      };
  }

  @Get('/findUserById')
  async findUser(@Query('id') id) {
    return await this.userDao.selectById(id);
  }

  @Post('/findUserList')
  async findUserList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.userDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'id' });
  }

  @Post('/editUser')
  async editUser(@Body() user) {
    return await this.userDao.update(user.id, user);
  }

  @Post('/deleteUser')
  async deleteUser(@Query('id') id) {
    return await this.userDao.deleteById(id);
  }
}
