import { Body, Controller, Get, Post, Query } from '@snow';
import { FffsgdsDao } from '../dao/FffsgdsDao';

@Controller('/fffsgds')
export default class FffsgdsController {
  private readonly fffsgdsDao = new FffsgdsDao();

  @Post('/addFffsgds')
  async addFffsgds(@Body() body) {
    return await this.fffsgdsDao.insert(body);
  }

  @Post('/findFffsgdsById')
  async findFffsgds(@Query('id') id) {
    return await this.fffsgdsDao.selectById(id);
  }

  @Post('/findFffsgdsList')
  async findFffsgdsList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.fffsgdsDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editFffsgds')
  async editFffsgds(@Body() body) {
    return await this.fffsgdsDao.update(body.id, body);
  }

  @Post('/deleteFffsgds')
  async deleteFffsgds(@Query('id') id) {
    return await this.fffsgdsDao.deleteById(id);
  }
}
