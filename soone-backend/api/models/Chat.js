/**
 * Chat.js
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
        startDate: {
            type: "ref",
            columnType: "datetime"
        },
        endDate: {
            type: "ref",
            columnType: "datetime"
        },
        active: {
            type: "boolean"
        },
        user1: {
            type: "string",
            columnType: "varchar(36)",
        },
        user2: {
            type: "string",
            columnType: "varchar(36)",
        },

        // Add a reference to messages
        messages: {
            collection: 'message',
            via: 'chatId'
        },
    },
};

