import { Body, Controller, Get, Post, Query } from '@snow';
import dayjs from 'dayjs';
import { FaultDao } from '../dao/FaultDao';

@Controller('/fault')
export default class FaultController {
    private readonly faultDao = new FaultDao();
    @Post("/addFault")
    async addFault(@Body() fault){
        this.faultDao.insert({
            fault,
            ctime:dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss')
        })
    }
    @Post('/getFault')
    async getFault(@Body() body){
        const { page, size, ...queryParams } = body;
        return await this.faultDao.selectPage(queryParams, { page, size }, { dirc: 'desc', field: 'id' });
    }
}