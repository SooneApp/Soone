/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id : {
      type : "number",
      unique : true,
      required : true
    },
    name : {
      type : "string",
      required : true
    },
    date : {
      type : "string",
      columnType : "datetime",
      required : true
    },
    sexe : {
      type : "string",
      isIn : ["H", "F", "O"],
      required : true
    },
    description : {
      type : "string"
    },
    email : {
      type : "string"
    },
    interet : {
      type : "string",
      isIn : ["H", "F", "O"],
      required : true
    },
    telephone : {
      type : "string",
      required : true
    },
    actif : {
      type : "boolean",
      defaultsTo : true 
    }
  },
};

