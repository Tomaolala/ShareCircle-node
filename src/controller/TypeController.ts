import { Body, Controller, Get, Post, Query } from '@snow';
import { TypeDao } from '../dao/TypeDao';

@Controller('/type')
export default class TypeController {
  private readonly typeDao = new TypeDao();

  @Post('/addType')
  async addType(@Body() body) {
    return await this.typeDao.insert(body);
  }

  @Post('/findTypeById')
  async findType(@Query('id') id) {
    return await this.typeDao.selectById(id);
  }

  @Post('/findTypeList')
  async findTypeList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.typeDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editType')
  async editType(@Body() body) {
    return await this.typeDao.update(body.id, body);
  }

  @Post('/deleteType')
  async deleteType(@Query('id') id) {
    return await this.typeDao.deleteById(id);
  }
}
