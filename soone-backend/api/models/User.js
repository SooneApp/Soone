/**
 * User.js
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
        name: {
            type: "string",
        },
        email: {
            type: "string"
        },
        phoneNumber: {
            type: "string",
            required: true
        },
        birthDate: {
            type: "ref",
            columnType: "datetime",
        },
        sex: {
            model: "sex",
        },
        sexInterest: {
            model: "sexinterest"
        },
        description: {
            type: "string"
        },
        lastSeen: {
            type: "ref",
            columnType: "datetime"
        },
        accountType: {
            model: "accounttype",
        },
        deletedAt: {
            type: "ref",
            columnType: "datetime"
        },
    },
};

