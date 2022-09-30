import { Body, Controller, Get, Post, Query } from '@snow';
import { BatteryDao } from '../dao/BatteryDao';

@Controller('/battery')
export default class AccoutController {
    private readonly batteryDao = new BatteryDao();
    @Post("/getBattery")
    async getBattery(@Body() battery)
    {
        return this.batteryDao.select(battery.params,battery.limit,battery.order)
    }
}