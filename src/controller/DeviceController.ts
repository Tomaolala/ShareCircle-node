import { Body, Controller, Get, Post, Query } from '@snow';
import { DeviceDao } from '../dao/DeviceDao';
import { OrderDao } from '../dao/OrderDao';
import { PayDao } from '../dao/PayDao';
import { CustomError } from '@snow/excption/index';

// 1-开启，2-关闭，3-待机，4-有异常
@Controller('/device')
export default class DeviceController {
  private readonly deviceDao = new DeviceDao();
  private readonly orderDao = new OrderDao();
  private readonly payDao = new PayDao();

  @Post('/addDevice')
  async addDevice(@Body() device) {
    return await this.deviceDao.insert(device);
  }

  @Get('/findDeviceById')
  async findDevice(@Query('id') id) {
    return await this.deviceDao.selectById(id);
  }

  // 查询所有物理设备
  @Post('/findDeviceList')
  async findDeviceList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.deviceDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'id' });
  }

  // 查询电车列表
  @Post('/findBikeList')
  async findBikeList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.deviceDao.selectPage({ ...queryParams, type: 1 }, { page, size }, { dirc: 'desc', field: 'id' });
  }

  // 查询电车详情
  @Get('/findBikeDetail')
  async findBikeDetail(@Query('id') id) {
    const bike = await this.deviceDao.selectById(id);
    return bike;
  }

  // 开车
  @Post('/openBike')
  async openBike(@Body() device) {
    // 判断是否有其他正在进行订单
    const { userId } = device;
    const hasRunning = await this.deviceDao.selectPage({ status: '1', userId }, { page: 1, size: 10 });
    const hasDowning = await this.deviceDao.selectPage({ status: '3', userId }, { page: 1, size: 10 });
    if (hasRunning.total + hasDowning.total > 0) {
      throw new CustomError(500, '您当前正在进行一笔订单，请勿重复进行');
    } else {
      // 更改电车状态
      await this.deviceDao.update(device.id, { ...device, status: '1' });
      // 新建订单
      await this.orderDao.insert({
        tram_id: device.id,
        user_id: userId,
        status: '1',
        ctime: new Date(),
      });
      return {};
    }
  }

  // 锁车
  @Post('/downDevice')
  async downDevice(@Body() device) {
    const { userId } = device;
    const bike = await this.deviceDao.selectById(device.id);

    if (bike?.status === '1') {
      return await this.deviceDao.update(device.id, { status: '3' });
    } else {
      throw new CustomError(500, '当前车辆不支持锁车操作');
    }
  }

  // 还车
  @Post('/exitDevice')
  async exitDevice(@Body() device) {
    const { userId } = device;
    const bike = await this.deviceDao.selectById(device.id);
    if (['1', '3'].includes(bike?.status)) {
      // 更改电车状态
      await this.deviceDao.update(device.id, { status: '2', userId: null });
      // 更改订单
      const order = (await this.orderDao.findOrderListByUserId(userId)).filter((v) => v.status === '1')[0];
      const startTime = new Date();
      const payment = Math.ceil(Math.abs(startTime.getTime() - new Date(order.ctime).getTime()) / 1000 / 60) * 0.5;
      await this.orderDao.update(order.id, { status: '2', startTime, payment });
      // await this.payDao.insert({ order_id: order.id, user_id: userId, pay_money: payment });
      return {};
    } else {
      throw new CustomError(500, '当前车辆不支持还车操作');
    }
  }

  @Post('/deleteDevice')
  async deleteDevice(@Query('id') id) {
    return await this.deviceDao.deleteById(id);
  }
}
