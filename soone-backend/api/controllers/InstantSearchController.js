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

function queue(user,req) {
    if(!waitingList) {
        waitingList = [user];
    } else {
        waitingList.push(user);
    }

    sails.sockets.join(req, user.id);
    sails.sockets.broadcast(user.id, "associated", "Hello to all my fun sockets!");
}

module.exports = {
    register: async function (req, res) { 
        if (!req.isSocket) {
            return res.badRequest();
        }

        var parameters = await sails.helpers.parseParameters.with({req});
        var user = await sails.helpers.user.getUser.with({id: parameters.id});
        var search = await sails.helpers.instantsearch.parseData.with(parameters);
        user = Object.assign(parameters, user);

        var association = associate(user);

        if(association) {
            sails.sockets.join(req, association.id);
            sails.sockets.broadcast("room", 'associated', { user1: association, user2: user });
        } else {
            queue(user,req);
        }

        res.ok();
    },
};