/**
 * Decision.js
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
        idMatch: {
            type: "string",
            columnType: "varchar(36)",
            required: true,
        },
        idUser: {
            type: "string",
            columnType: "varchar(36)",
            required: true,
        },
        decision: {
            type: "boolean",
        },
    },

};

