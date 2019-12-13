import PahoMQTT from 'paho-mqtt';

let mqtt;
let reconnectTimeout = 2000;
const host = 'localhost';
// const port = 9001;
// const port = 15672;

const port = 15675;
// const port = 1883;

// const port = Number(window.location.port); // from the example at https://www.eclipse.org/paho/clients/js/
// const port = 65312;
// console.log('///', window.location.port);

// const RENAME_THIS_LATER = 'sensor1';

// const RENAME_THIS_LATER = 'first-queue';
// const RENAME_THIS_LATER = 'testqueue';
const RENAME_THIS_LATER = '';


const onConnect = () => {
  console.log('Connected');
  // mqtt.subscribe('/topic/test', {qos: 1});

  mqtt.subscribe('first-queue', {qos: 1}); // if we provide the first argument as an empty string, our app will receive the `hellooo, world` message below

  let message = new PahoMQTT.Message('hellooo, world');
  message.destinationName = RENAME_THIS_LATER;
  mqtt.send(message);
};

const onFailure = err => console.warn('ACHTUNG!!! Connection failed:', err);




/*

// const conn1 = new window.WebSocket('ws://localhost:15675/mqtt');
// const conn1 = new window.WebSocket('ws://localhost:9001/mqtt');
const conn1 = new window.WebSocket('ws://localhost:15675/mqtt');
// const conn1 = new window.WebSocket('ws://localhost:15672/mqtt');
console.log({conn1})
*/





const MQTTConnect = () => {
  console.log(`connecting to ${host} ${port}`);
  // mqtt = new PahoMQTT.Client(host, port, 'clientjs');
  // mqtt = new PahoMQTT.Client(host, port, `clientjs`);

  // mqtt = new PahoMQTT.Client(host, port, `127.0.0.1`);
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

    timeout: 3,
    onSuccess: onConnect,
    onFailure
  };

  mqtt.connect(options);
};


MQTTConnect();




/*
const wsbroker = window.location.hostname;  // mqtt websocket enabled broker
// const wsbroker = window.location.host;  // mqtt websocket enabled broker
// const wsport = 15675; // port for above
const wsport = 15672; // port for above
// const wsport = 1883; // port for above
console.log({wsbroker});


// Create a client instance
const client = new PahoMQTT.Client(wsbroker, Number(wsport), "clientId");


console.log('---', window.location.host, window.location.hostname)
// called when the client connects
const onConnect = () => {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  // client.subscribe("World");
  // client.subscribe("first-queue");
  // client.subscribe("first-queue");
  // client.subscribe("amq.gen--ZBrMQS7ckdRZJpn4hGs5A");
  client.subscribe(''); // leaving this empty, so last declared on this channel queue name will be used (https://stackoverflow.com/a/22197339/2504429)
  const message = new PahoMQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when connection fails
const onFailure = err => console.warn('Connectino failed:', err);

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
  onSuccess: onConnect,
  onFailure
});


// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
}
*/
