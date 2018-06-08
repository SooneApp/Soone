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
        idUser1: {
            type: "string",
            columnType: "varchar(36)",
            required: true,
            unique: true
        },
        idUser2: {
            type: "string",
            columnType: "varchar(36)",
            required: true,
            unique: true
        },
    },
};

