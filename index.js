var rabbitmqUri = "amqp://notification-mq";
var smtpUri = process.env.MAIL_URL;
var amqp = require("amqplib/callback_api");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport(smtpUri);

function sendMail(subject, message) {
  var sendingAddress = process.env.TO_ADDRESS;
  var mailOptions = {
    to: sendingAddress,
    subject: subject,
    text: message
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
}

amqp.connect(rabbitmqUri, function(err, conn) {
  conn.createChannel(
    function(err, ch) {
      var queue = "notifications";
      ch.assertQueue(queue, { durable: false });
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      ch.consume(queue, function(msg) {
        var message = JSON.parse(msg.content);
        console.log(message);
        sendMail(
          "Notification!",
          "Hi, here's a new notification: " + message.text
        );
      });
    },
    { noAck: true }
  );
});
