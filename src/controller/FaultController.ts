import { Body, Controller, Get, Post, Query } from '@snow';
import { FaultDao } from '../dao/FaultDao';

@Controller('/fault')
export default class FaultController {
  private readonly faultDao = new FaultDao();

  @Post('/addFault')
  async addFault(@Body() body) {
    return await this.faultDao.insert(body);
  }

  @Post('/findFaultById')
  async findFault(@Query('id') id) {
    return await this.faultDao.selectById(id);
  }

  @Post('/findFaultList')
  async findFaultList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.faultDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editFault')
  async editFault(@Body() body) {
    return await this.faultDao.update(body.id, body);
  }

  @Post('/deleteFault')
  async deleteFault(@Query('id') id) {
    return await this.faultDao.deleteById(id);
  }
}
