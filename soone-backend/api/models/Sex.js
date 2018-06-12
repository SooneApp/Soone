/**
 * Sex.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        id: {
            type: "number",
            autoIncrement: true
        },
        label: {
            type: "string",
            columnType: "varchar(16)"
        },

        //relation
        users: {
            collection: 'user',
            via: 'sex'
        }

    },

};

