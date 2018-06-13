var AWS = require('aws-sdk');

function parseParameters(req) {
    return _.extend(req.query || {}, req.params || {}, req.body || {});
};


module.exports = {
    sendAdvertismentSms: async function (req, res) { 
        var userVal = parseParameters(req);

        AWS.config.update({
            accessKeyId: 'AKIAJSK3DKZIRULDKCJQ',
            secretAccessKey: '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',
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
    }
};

