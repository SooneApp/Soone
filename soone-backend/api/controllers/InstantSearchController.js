var admin = require("firebase-admin");
var waitingList;

function associate (user) {
    var result = false;

    if(typeof waitingList != "undefined")
    {
        waitingList.forEach(element => {
            if(element.city == user.city) {
                result = element;
            }
        });
    }

    return result;
}

function queue(user) {
    if(!waitingList) {
        waitingList = [user];
    } else {
        waitingList.push(user);
    }
}

function sendMessage(message,target) {
    message.token = target;
    admin.messaging().send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

module.exports = {
    register: async function (req, res) { 
        var parameters = await sails.helpers.parseParameters.with({req});
        var user = await sails.helpers.user.getUser.with({id: parameters.id});
        var search = await sails.helpers.instantsearch.parseData.with(parameters);
        user = Object.assign(parameters, user);
        var association = associate(user);

        if(association) {
            var associationTokken = association.appToken;
            var userTokken = user.appToken;

            var message = {
                data: {
                    user1: JSON.stringify(await sails.helpers.user.sortUser.with({user: association})),
                    user2: JSON.stringify(await sails.helpers.user.sortUser.with({user}))
                }
            };
            sendMessage(message,associationTokken);
            sendMessage(message,userTokken);
        } else {
            queue(user);
        }

        res.ok();
    },
};