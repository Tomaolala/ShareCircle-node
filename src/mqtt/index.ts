import { Client, MessageBody, MqttGateway, SubscribeMessage, MqttInstance } from '@snow';
import { MqttClient } from 'mqtt';

@MqttGateway('127.0.0.1', 1883, { clientId: 'node-server' })
export class MqttServer {
  @MqttInstance()
  mqttClient: MqttClient;

  @SubscribeMessage('test')
  async subscribeMessageTest(@MessageBody() message: string, @Client() client: MqttClient) {
    console.log(message);
    
  }
}


