import { Body, Controller, Get, Post, Query } from '@snow';
import { AccountDao } from '../dao/AccountDao';

@Controller('/account')
export default class AccountController {
  private readonly accountDao = new AccountDao();

  @Post('/addAccount')
  async addAccount(@Body() body) {
    return await this.accountDao.insert(body);
  }

  @Post('/findAccountById')
  async findAccount(@Query('id') id) {
    return await this.accountDao.selectById(id);
  }

  @Post('/findAccountList')
  async findAccountList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.accountDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editAccount')
  async editAccount(@Body() body) {
    return await this.accountDao.update(body.id, body);
  }

  @Post('/deleteAccount')
  async deleteAccount(@Query('id') id) {
    return await this.accountDao.deleteById(id);
  }
}
