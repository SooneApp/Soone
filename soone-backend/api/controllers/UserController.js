/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    checkCredentials: function (req, res) {

    },
    addUser: async function (req, res) { 
        var userVal = req.query;
        var user = await sails.helpers.addUser.with(userVal)
            .tolerate('alreadyExists', (err) => {
                res.status(409);
                return err;
            });
        
        res.json(user);
    },
    getUser: function (req, res) { 

    },
};

