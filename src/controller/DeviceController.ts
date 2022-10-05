import { Body, Controller, Get, Post, Query } from '@snow';
import { DeviceDao } from '../dao/DeviceDao';

@Controller('/device')
export default class DeviceController {
    private readonly deviceDao = new DeviceDao();

    /**
     *  查询所有电车 返回电车的Id
     */
    @Get("/getAllBikes")
    async  getAllBikes(){
        return this.deviceDao.getAllBikes()
    }
}