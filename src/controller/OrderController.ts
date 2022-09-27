import { Body, Controller, Get, Post, Query } from '@snow';
import { OrderDao } from '../dao/OrderDao';

@Controller('/order')
export default class OrderController {
  private readonly orderDao = new OrderDao();

  @Post('/addOrder')
  async addOrder(@Body() body) {
    return await this.orderDao.insert(body);
  }

  @Post('/findOrderById')
  async findOrder(@Query('id') id) {
    return await this.orderDao.selectById(id);
  }

  @Post('/findOrderList')
  async findOrderList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.orderDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editOrder')
  async editOrder(@Body() body) {
    return await this.orderDao.update(body.id, body);
  }

  @Post('/deleteOrder')
  async deleteOrder(@Query('id') id) {
    return await this.orderDao.deleteById(id);
  }
}
