var AWS = require('aws-sdk');

function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let waitingUsers=[];

function sendSMS(phoneNumber,message){
  const Nexmo = require('nexmo')

  const nexmo = new Nexmo({
    apiKey: "",
    apiSecret: ""
  })

  const from = 'Acme Inc'
  console.log(phoneNumber);
  try {
      nexmo.message.sendSms(from, phoneNumber.replace(" ",""), message)
  }
  catch (e) {
      console.log("Erreur de numero de tel");
  }

}
waitingUsers= [];
module.exports = {
    sendAdvertismentSms: async function (req, res) {
      var userVal = parseParameters(req);
        sendSMS(userVal.phoneNumber,"Hey, please download our app here https://");
        console.error(error);
        res.toJSON("erreur de numero")
        res.ok();
    },
    sendRegisterCode: async function (req,res){

        var userVal = parseParameters(req);

        var userbdd = await sails.helpers.user.getUser.with(userVal).tolerate("notExists",function(){});
        if (typeof userbdd == 'undefined'){
            code = getRandomInt(9999);
            user = {phoneNumber: userVal.phoneNumber, code: code}
            var picked = waitingUsers.find(o => o.phoneNumber === userVal.phoneNumber);
            console.log(code);
            if (typeof picked !== 'undefined' && picked.phoneNumber==user.phoneNumber){
            }
            else{
                //sendSMS(userVal.phoneNumber,"Votre code d'accès est : "+code);
                waitingUsers.push(user);
            }

            res.ok()
        }
        else{
            res.json("erreur")
        }
    },
    receiveAccessCode: async function(req,res){
        var userVal = parseParameters(req);
        console.log(userVal);
        var picked = waitingUsers.find(o => o.phoneNumber === userVal.phoneNumber);
        console.log(picked);
        if (typeof picked !== 'undefined' && picked.code==userVal.code){
            var user = await sails.helpers.user.addUser.with(userVal);

            var index = waitingUsers.indexOf(picked);
            if (index > -1) {
                waitingUsers.splice(index, 1);
            }
            console.log(waitingUsers);
            res.ok()
        }
        else{
            res.json("error")
        }
    }
};

