import { Body, Controller, Get, Post, Query } from '@snow';
import { PayDao } from '../dao/PayDao';

@Controller('/pay')
export default class PayController {
  private readonly payDao = new PayDao();

  @Post('/addPay')
  async addPay(@Body() body) {
    return await this.payDao.insert(body);
  }

  @Post('/findPayById')
  async findPay(@Query('id') id) {
    return await this.payDao.selectById(id);
  }

  @Post('/findPayList')
  async findPayList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.payDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editPay')
  async editPay(@Body() body) {
    return await this.payDao.update(body.id, body);
  }

  @Post('/deletePay')
  async deletePay(@Query('id') id) {
    return await this.payDao.deleteById(id);
  }
}
