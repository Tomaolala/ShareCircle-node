import { Body, Controller, Get, Post, Query } from '@snow';
import { DirectiveDao } from '../dao/DirectiveDao';

@Controller('/directive')
export default class DirectiveController {
  private readonly directiveDao = new DirectiveDao();

  @Post('/addDirective')
  async addDirective(@Body() directive) {
    return await this.directiveDao.insert(directive);
  }

  @Get('/findDirectiveById')
  async findDirective(@Query('id') id) {
    return await this.directiveDao.selectById(id);
  }

  // 查询所有指令
  @Post('/findDirectiveList')
  async findDirectiveList(@Body() body) {
    const { page, size, ...queryParams } = body;
    return await this.directiveDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'id' });
  }

  @Post('/editDirective')
  async editDirective(@Body() directive) {
    return await this.directiveDao.update(directive.id, directive);
  }

  @Post('/deleteDirective')
  async deleteDirective(@Query('id') id) {
    return await this.directiveDao.deleteById(id);
  }
}
