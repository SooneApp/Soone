var AWS = require('aws-sdk');

function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
waitingUsers= [];
module.exports = {
    sendAdvertismentSms: async function (req, res) {
        var userVal = parseParameters(req);

        AWS.config.update({
            accessKeyId: 'AKIAIF3XWKSD55PDSIRQ',
            secretAccessKey: 'EsvW2H1IuB+cTuL+xtkmJhFWto5QLYbOOjl3uVsZ',
            region: 'us-east-1'
        });

        var sns = new AWS.SNS();
        var params = {
            Message: "your message",
            MessageStructure: 'string',
            PhoneNumber: userVal.phoneNumber,
            Subject: 'your subject'
        };

        sns.publish(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });

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
        waitingUsers.push(user);
        console.log(waitingUsers)
        AWS.config.update({
          accessKeyId: 'AKIAIF3XWKSD55PDSIRQ',
          secretAccessKey: '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',
          region: 'us-east-1'
        });

        var sns = new AWS.SNS();
        var params = {
          Message: "Code :"+code,
          MessageStructure: 'string',
          PhoneNumber: userVal.phoneNumber,
          Subject: 'Registration code'
        };
      }



      //sns.publish(params, function(err, data) {
        //if (err) console.log(err, err.stack); // an error occurred
        //else     console.log(data);           // successful response
      //});

        res.json(waitingUsers)
    }
};

