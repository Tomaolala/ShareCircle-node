const mosca = require('mosca');
const config = require('./config');
const dayjs =require('dayjs')
const { port, hardwareClientId } = config;

const mqttSetting={
  interfaces:[
    {
      type:"mqtt",
      port:"1883"
    },
    {
      type:"http",
      port:"1884",
      bundle:true
    }
  ]
}


const connector = new Set();
const failMsgTopicMap = new Map();

const server = new mosca.Server(mqttSetting);

server.on('ready', setup);

server.on('clientConnected', function (client) {
  if (!client) return;
  console.log('连接：', client.id,dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss'));

  connector.add(client.id);
});

server.on('clientDisconnected', function (client) {
  if (!client) return;
  console.log('断开连接：', client.id,dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss'));

  connector.delete(client.id);
});

server.on('published', (packet, client) => {
  if (!packet || !client) return;
  console.log('published', packet);

  const { topic } = packet;
  const { id: clientId } = client;

  if (isSendFail(clientId)) {
    const failMsg = failMsgTopicMap.get(topic) || [];
    failMsg.push(packet);
    failMsgTopicMap.set(topic, failMsg);
  }
});

server.on('subscribed', (topic, client) => {
  if (!topic || !client) return;

  if (failMsgTopicMap.has(topic)) {
    const failMsg = failMsgTopicMap.get(topic) || [];
    failMsg.forEach((packet) => {
      server.publish(packet, null);
    });
    failMsgTopicMap.delete(topic);
  }
});

function setup() {
  console.log(`### Mosca server is up and running -- port: ${port}`);
}

function isSendFail(clientId) {
  const isHardWareClient = hardwareClientId === clientId;
  return (
    (isHardWareClient && connector.size === 1 && connector.has(hardwareClientId)) ||
    (!isHardWareClient && !connector.has(hardwareClientId))
  );
}
