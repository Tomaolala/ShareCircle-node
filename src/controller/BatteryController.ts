import { Body, Controller, Get, Post, Query } from '@snow';
import { BatteryDao } from '../dao/BatteryDao';

@Controller('/battery')
export default class BatteryController {
  private readonly batteryDao = new BatteryDao();

  @Post('/addBattery')
  async addBattery(@Body() body) {
    return await this.batteryDao.insert(body);
  }

  @Post('/findBatteryById')
  async findBattery(@Query('id') id) {
    return await this.batteryDao.selectById(id);
  }

  @Post('/findBatteryList')
  async findBatteryList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.batteryDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editBattery')
  async editBattery(@Body() body) {
    return await this.batteryDao.update(body.id, body);
  }

  @Post('/deleteBattery')
  async deleteBattery(@Query('id') id) {
    return await this.batteryDao.deleteById(id);
  }
}
