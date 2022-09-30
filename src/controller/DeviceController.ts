import { Body, Controller, Get, Post, Query } from '@snow';
import { DeviceDao } from '../dao/DeviceDao';

@Controller('/device')
export default class AccoutController {
    private readonly deviceDao = new DeviceDao();

}