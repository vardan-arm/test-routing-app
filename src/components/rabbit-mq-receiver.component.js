/*
import * as amqp from 'amqplib/callback_api';

const open = amqp.connect('amqp://localhost');

const q = 'tasks';


// Publisher
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.sendToQueue(q, Buffer.from('something to do'));
  });
}).catch(console.warn);

// Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);


//
// // Consumer
// open.then(conn => {
//   return conn.createChannel();
// })
//   .then(ch => {
//     return ch.assertQueue(q)
//       .then(ok => {
//         return ch.consume(q, msg => {
//           if (msg !== null) {
//             console.log(msg.content.toString());
//             ch.ack(msg);
//           }
//         })
//       })
//   })
//   .catch(console.warn);
*/
