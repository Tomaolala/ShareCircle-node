import { Body, Controller, Get, Post, Query } from '@snow';
import { OrderDao } from '../dao/OrderDao';

@Controller('/order')
export default class OrderController {
    private readonly orderDao = new OrderDao();
    @Get('/findOrderByUserId')
    async getOrderById(@Query("id") userId) {
    return await this.orderDao.getOrderById(userId);
    }
}
