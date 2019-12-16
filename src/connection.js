import PahoMQTT from 'paho-mqtt';

let mqtt;
let reconnectTimeout = 2000;
const host = 'localhost'; // change this to '127.0.0.1' in order to have it working in IE // https://stackoverflow.com/questions/47471024/websocket-on-loopback-cross-zone-connection-not-allowed-error-on-ms-edge
const port = 15675;

const ROUTING_KEY = 'some_key';


const onConnect = () => {
  console.log('Connected');

  // Frontend connects to "amq.topic" exchange. It creates a queue named, for example, "mqtt-subscription-myclientid_1qos1" under that exchange.
  // Backend will send messages to that exchange with corresponding routing key ("some_key" in our example), which will be caught by frontend.
  // More details here - https://stackoverflow.com/questions/27228957/how-subscribe-in-an-rabbitmq-queue-with-mqtt-paho/27256656
  mqtt.subscribe(ROUTING_KEY, {qos: 1});

  let message = new PahoMQTT.Message('hellooo, world');
  message.destinationName = ROUTING_KEY;

  mqtt.send(message);
};

const onFailure = err => console.warn('ACHTUNG!!! Connection failed:', err);

const MQTTConnect = () => {
  console.log(`connecting to ${host} ${port}`);

  mqtt = new PahoMQTT.Client(host, port, '/ws', `myclientid_${parseInt(Math.random() * 100, 10)}`); // from example at https://www.rabbitmq.com/web-mqtt.html#usage

  mqtt.onConnectionLost = function (responseObject) {
    console.log("CONNECTION LOST - " + responseObject.errorMessage);
  };
  mqtt.onMessageArrived = function (message) {
    console.log("RECEIVE ON " + message.destinationName + " PAYLOAD " + message.payloadString);
  };

  const options = {
    // comment these 2 if they are not required
    userName: 'guest',
    password: 'guest',
    // userName: 'test-user',
    // password: 'password',

    // timeout: 5,
    // keepAliveInterval: 1,
    onSuccess: onConnect,
    onFailure
  };

  mqtt.connect(options);
};


MQTTConnect();
