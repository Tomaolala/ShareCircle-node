import { Client, MessageBody, MqttGateway, SubscribeMessage } from '@snow';
import { MqttClient } from 'mqtt';
import { UserDao } from '../dao/UserDao';

@MqttGateway('127.0.0.1', 1883)
export class MqttServer {
  private readonly userDao = new UserDao();

  @SubscribeMessage('test')
  async subscribeMessageTest(@MessageBody() message: string, @Client() client: MqttClient) {
    console.log(message);

    const user = await this.userDao.getUserById(2);
    console.log(user);
  }
}
