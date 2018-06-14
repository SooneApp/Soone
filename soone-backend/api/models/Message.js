/**
 * Message.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: "string",
            columnType: "varchar(36)",
            required: true,
            unique: true
        },
        chatId: {
            model: 'chat'
        },
        senderId: {
            type: "string",
            columnType: "varchar(36)"
        },
        content: {
            type: "string",
            columnType: "varchar(512)"
        },
        date: {
            type: "ref",
            columnType: "datetime",
        },
    },

};

