import { Application, useMqtt } from '@snow';
import { MqttServer } from './mqtt';

@Application()
class SysApplication {
  before(app) {
    // app.use('/', (req, res, next) => {
    //   console.log(req.path);

    //   next();
    // });
    useMqtt(new MqttServer());
  }
}
