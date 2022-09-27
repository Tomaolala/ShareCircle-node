import { Body, Controller, Get, Post, Query } from '@snow';
import { DeviceDao } from '../dao/DeviceDao';

@Controller('/device')
export default class DeviceController {
  private readonly deviceDao = new DeviceDao();

  @Post('/addDevice')
  async addDevice(@Body() body) {
    return await this.deviceDao.insert(body);
  }

  @Post('/findDeviceById')
  async findDevice(@Query('id') id) {
    return await this.deviceDao.selectById(id);
  }

  @Post('/findDeviceList')
  async findDeviceList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.deviceDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editDevice')
  async editDevice(@Body() body) {
    return await this.deviceDao.update(body.id, body);
  }

  @Post('/deleteDevice')
  async deleteDevice(@Query('id') id) {
    return await this.deviceDao.deleteById(id);
  }
}
