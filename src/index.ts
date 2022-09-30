import { Application, useMqtt } from '@snow';
import { MqttServer } from './mqtt';

@Application()
class SysApplication {
  before(app) {
    useMqtt(new MqttServer());
  }
}
