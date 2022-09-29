import { Body, Controller, Get, Post, Query } from '@snow';
import { OrderDao } from '../dao/OrderDao';

@Controller('/order')
export default class OrderController {
  private readonly orderDao = new OrderDao();

  @Post('/addOrder')
  async addOrder(@Body() order) {
    return await this.orderDao.insert(order);
  }

  // @Get('/findOrderById')
  // async findOrder(@Query('id') id) {
  //   return await this.orderDao.selectById(id);
  // }

  // 查找当前id订单
  @Get('/findOrderById')
  async findOrderById(@Query('id') id) {
    return (await this.orderDao.findOrderById(id))[0];
  }

  // 查找用户全部订单
  @Get('/findOrderList')
  async findOrderList(@Query('userId') userId): Promise<Array<object>> {
    return await this.orderDao.findOrderListByUserId(userId);
  }

  // 查找用户总订单数量
  @Get('/findOrderTotal')
  async findOrderTotal(@Query('userId') userId) {
    return (await this.orderDao.getTotalOrder(userId))[0];
  }

  @Post('/editOrder')
  async editOrder(@Body() order) {
    return await this.orderDao.update(order.id, order);
  }

  @Post('/deleteOrder')
  async deleteOrder(@Query('id') id) {
    return await this.orderDao.deleteById(id);
  }
}
