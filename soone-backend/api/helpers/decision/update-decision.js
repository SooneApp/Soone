module.exports = {
    friendlyName: "Update decision",

    description: "Update decision to the system based on its id",

    inputs: {
        id: {
            description: 'The id of the decision to update',
            type: 'string',
            required: true
        },
        decision: {
            description: 'The decision boolean value',
            type: 'boolean',
            required: true
        },
    },

    exits: {
        success: {
            responseType: 'json',
        },
        notExists: {
            description: 'The decision doesn t exists'
        }
    },

    fn: async function (inputs, exits) {
        let parameters = {id: inputs.id};
        delete inputs.id;

        let decision = await Decision.findOne(parameters);

        //Test if the decision exist
        if (!decision) {
            return exits.notExists();
        }

        decision = await Decision.update(parameters).set(inputs).fetch();

        let idChat = decision[0].idChat.toString();
        let userId = decision[0].idUser.toString();

        if (inputs.decision === 0 || inputs.decision === false) {
            let values = {
                id: idChat,
                active: 0
            };
            await sails.helpers.chat.updateChat.with(values);

        } else if (inputs.decision === 1 || inputs.decision === true) {

            let chat = await sails.helpers.chat.getChat.with({id: idChat});

            let otherUserId;

            userId === chat.user1 ? otherUserId = chat.user2 : otherUserId = chat.user1;

            let otherUserDecison = await sails.helpers.decision.getDecision.with({
                idChat: idChat,
                idUser: otherUserId
            });

            if (otherUserDecison.decision === true || otherUserDecison.decision === 1) {
                let values = {
                    id: idChat,
                    active: 1
                };
                await sails.helpers.chat.updateChat.with(values);
            }
        }

        return exits.success(decision[0]);
    }
};