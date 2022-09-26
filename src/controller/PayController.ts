import { Body, Controller, Get, Post, Query } from '@snow';
import { PayDao } from '../dao/PayDao';

@Controller('/pay')
export default class PayController {
  private readonly payDao = new PayDao();

  // 新增支付
  @Post('/addPay')
  async addPay(@Body() pay) {
    return await this.payDao.insert({ ctime: new Date(), ...pay });
  }

  @Get('/findPayById')
  async findPay(@Query('id') id) {
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
