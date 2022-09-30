import { Body, Controller, Get, Post, Query } from '@snow';
import { AccoutDao } from '../dao/AccoutDao';

@Controller('/accout')
export default class AccoutController {
    private readonly accoutdao = new AccoutDao();

    // 注册成功初始化数据
    @Post('/initAccout')
    async initAccout(@Body() accout){
        return await this.accoutdao.insert({
            id:accout.id,
            userId:accout.userId,
            payMoney:0,
            ctime:accout.ctime
        });
    }

    @Get('/getAccoutById')
    async getAccoutById(@Query("id") id){
        return await this.accoutdao.selectById(id)
    }
    
    @Post("/changeMoney")
    async changeMoney(@Body() body){
        return await this.accoutdao.update(body.id,{
            "pay_money":body.money
        })
    }

}