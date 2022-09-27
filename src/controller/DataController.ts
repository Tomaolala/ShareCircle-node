import { Body, Controller, Get, Post, Query } from '@snow';
import { DataDao } from '../dao/DataDao';

@Controller('/data')
export default class DataController {
  private readonly dataDao = new DataDao();

  @Post('/addData')
  async addData(@Body() body) {
    return await this.dataDao.insert(body);
  }

  @Post('/findDataById')
  async findData(@Query('id') id) {
    return await this.dataDao.selectById(id);
  }

  @Post('/findDataList')
  async findDataList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.dataDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editData')
  async editData(@Body() body) {
    return await this.dataDao.update(body.id, body);
  }

  @Post('/deleteData')
  async deleteData(@Query('id') id) {
    return await this.dataDao.deleteById(id);
  }
}
