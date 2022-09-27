import { Client, MessageBody, MqttGateway, SubscribeMessage } from '@snow';
import { MqttClient } from 'mqtt';

@MqttGateway('127.0.0.1', 1883)
export class MqttServer {
  @SubscribeMessage('test')
  async subscribeMessageTest(@MessageBody() message: string, @Client() client: MqttClient) {}
}
