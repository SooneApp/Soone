var admin = require("firebase-admin");
var waitingList;

function associate (user) {
    var result = false;

    if(typeof waitingList != "undefined")
    {
        for (var element in waitingList) {
            if(match(user,waitingList[element]) && match(waitingList[element],user)) {
                result = waitingList[element];
                waitingList.splice(element,1);
                break;
            }
        }
    }

    return result;
}

function match(user,matched) {
    var age = sails.helpers.user.getAge.with({birthDate: matched.birthDate});
    var result = false;

    var check = 
        matched.city == user.city &&
        user.ageRange[0] <= age &&
        user.ageRange[1] >= age &&
        user.sexInterests.indexOf(matched.sex) != -1;
    if(check) {
        result = true;
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
    return admin.messaging().send(message);
}

module.exports = {
    register: async function (req, res) { 
        var parameters = await sails.helpers.parseParameters.with({req});
        var user = await sails.helpers.user.getUser.with({id: parameters.id});

        sails.log(user.name + " joined instant search");

        user = Object.assign(parameters, user);
        user = await sails.helpers.user.parseData.with({user});

        var association = await associate(user);
        if(association) {
            var associationTokken = association.appToken;
            var userTokken = user.appToken;
            var chat = await sails.helpers.chat.addChat.with({idUser1: association.id, idUser2: user.id});

            sails.log(user.name + " left instant search");
            sails.log(association.name + " left instant search");

            var message = {
                data: {
                    user1: JSON.stringify(await sails.helpers.user.sortUser.with({user: association})),
                    user2: JSON.stringify(await sails.helpers.user.sortUser.with({user})),
                    chatId: chat.id
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