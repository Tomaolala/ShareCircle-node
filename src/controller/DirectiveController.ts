import { Body, Controller, Get, Post, Query } from '@snow';
import { DirectiveDao } from '../dao/DirectiveDao';

@Controller('/directive')
export default class DirectiveController {
  private readonly directiveDao = new DirectiveDao();

  @Post('/addDirective')
  async addDirective(@Body() body) {
    return await this.directiveDao.insert(body);
  }

  @Post('/findDirectiveById')
  async findDirective(@Query('id') id) {
    return await this.directiveDao.selectById(id);
  }

  @Post('/findDirectiveList')
  async findDirectiveList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.directiveDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'ctime' });
  }

  @Post('/editDirective')
  async editDirective(@Body() body) {
    return await this.directiveDao.update(body.id, body);
  }

  @Post('/deleteDirective')
  async deleteDirective(@Query('id') id) {
    return await this.directiveDao.deleteById(id);
  }
}
