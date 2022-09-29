import { Body, Controller, Get, Post, Query } from '@snow';
import { AccountDao } from '../dao/AccountDao';

@Controller('/account')
export default class AccountController {
  private readonly accountDao = new AccountDao();

  // 新增账户--用户注册时新增
  @Post('/addAccount')
  async addAccount(@Body() account) {
    return await this.accountDao.insert({ ctime: new Date(), ...account });
  }

  @Get('/findAccountById')
  async findAccount(@Query('id') id){
    return await this.accountDao.selectById(id);
  }

  @Post('/findAccountList')
  async findAccountList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.accountDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'id' });
  }

  @Post('/editAccount')
  async editAccount(@Body() account) {
    return await this.accountDao.update(account.id, account);
  }

  @Post('/deleteAccount')
  async deleteAccount(@Query('id') id) {
    return await this.accountDao.selectById(id);
  }

  // 充值
  @Post('/investMoney')
  async investMoney(@Body() body) {
    const { id, money } = body;
    const account = await this.accountDao.selectById(id);
    const result = money + account.money;
    if (result < 0) {
      // @code
    } else {
      return await this.accountDao.update(id, { money: result });
    };
  }
}
