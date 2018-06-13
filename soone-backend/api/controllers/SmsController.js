var AWS = require('aws-sdk');

function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let waitingUsers=[];

function sendSMS(phoneNumber,message){
  AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1'
  });

  var sns = new AWS.SNS();
  var params = {
    Message: message,
    MessageStructure: 'string',
    PhoneNumber: phoneNumber,
    Subject: 'your subject'
  };

  sns.publish(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
waitingUsers= [];
module.exports = {
    sendAdvertismentSms: async function (req, res) {
        var userVal = parseParameters(req);
        sendSMS(userVal.PhoneNumber,"Hey, please download our app here https://")
        res.ok();
    },
    sendRegisterCode: async function (req,res){
      var userVal = parseParameters(req);

      code = getRandomInt(9999);
      user = {phoneNumber: userVal.phoneNumber, code: code}
      var picked = waitingUsers.find(o => o.phoneNumber === userVal.phoneNumber);
      console.log(picked);

      if (typeof picked !== 'undefined' && picked.phoneNumber==user.phoneNumber){
      }
      else{
          sendSMS(userVal.phoneNumber,"Votre code d'accès est : "+code);
          waitingUsers.push(user);
      }

        res.json(waitingUsers)
    }
};

