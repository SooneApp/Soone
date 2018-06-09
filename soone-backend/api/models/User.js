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
            type: "string",
            columnType: "datetime",
        },
        sex: {
            type: "number",
        },
        sexInterest: {
            type: "number"
        },
        description: {
            type: "string"
        },
        lastSeen: {
            type: "string",
            columnType: "datetime"
        },
        createdAt: {
            type: "string",
            columnType: "datetime",
        },
        updatedAt: {
            type: "string",
            columnType: "datetime"
        },
        deletedAt: {
            type: "string",
            columnType: "datetime"
        },
    },
};
