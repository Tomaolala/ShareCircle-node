import { Body, Controller, Get, Post, Query } from '@snow';
import { PayDao } from '../dao/PayDao';
import { AccountDao } from '../dao/AccountDao';
import { OrderDao } from '../dao/OrderDao';
import { CustomError } from '@snow/excption/index';

@Controller('/pay')
export default class PayController {
  private readonly payDao = new PayDao();
  private readonly accountDao = new AccountDao();
  private readonly orderDao = new OrderDao();

  // 新增支付
  @Post('/addPay')
  async addPay(@Body() pay) {
    // 新增支付
    await this.payDao.insert({ ctime: new Date(), ...pay });
    // 扣账户余额
    const { payMoney, userId, orderId } = pay;
    const account = await this.accountDao.selectById(userId);
    if (account.money < payMoney) {
      throw new CustomError(500, '您的账户余额不足');
    } else {
      await this.accountDao.update(userId, { money: account.money - payMoney });
      await this.orderDao.update(orderId, { endTime: new Date(), status: '3' });
      return {};
    }
  }

  @Get('/findPayById')
  async findPay(@Query('userid') id) {
    return await this.payDao.selectById(id);
  }

  // 支付列表
  @Post('/findPayList')
  async findPayList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.payDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'id' });
  }

  @Post('/editPay')
  async editPay(@Body() pay) {
    return await this.payDao.update(pay.id, pay);
  }

  @Post('/deletePay')
  async deletePay(@Query('id') id) {
    return await this.payDao.deleteById(id);
  }

  @Get('/getTotalPay')
  async getTotalPay(@Query('userId') userId) {
    const res = await this.payDao.getTotalPay(userId);
    return res[0].totalPay || 0;
  }
}
