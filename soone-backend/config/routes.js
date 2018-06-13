/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    '/': {
        view: 'index'
    },
    //USER ROUTES
    "GET /api/user": "UserController.get",
    "POST /api/user": "UserController.add",
    "PUT /api/user": "UserController.update",
    "POST /api/connect": "UserController.connect",
    "GET /api/disconnect": "UserController.disconnect",
    //Match  ROUTES
    "GET /api/match": "MatchController.get",
    "POST /api/match": "MatchController.add",
    "PUT /api/match": "MatchController.update",
    //Match decision ROUTES
    "GET /api/matchDecision": "DecisionController.get",
    "POST /api/matchDecision": "DecisionController.add",
    "PUT /api/matchDecision": "DecisionController.update",
    //SMS ROUTES
    "POST /api/sms/advertising": "SmsController.sendAdvertismentSms"
};
