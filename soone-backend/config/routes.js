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
    //INSTANT SEARCH ROUTES
    "POST /api/instantSearch": "InstantSearchController.register",
    //Decision decision ROUTES
    "GET /api/decision": "DecisionController.get",
    "PUT /api/decision": "DecisionController.update",
    //MATCH ROUTES
    "GET /api/chat": "ChatController.get",
    "POST /api/chat": "ChatController.add",
    //MESSAGE ROUTES
    "POST /api/message": "ChatController.send",
    "GET /api/messages": "ContactController.getMessages",
    //MATCH DECISION ROUTES
    "GET /api/matchDecision": "DecisionController.get",
    "PUT /api/matchDecision": "DecisionController.update",
    //SMS ROUTES
    "POST /api/sms/advertising" : "SmsController.sendAdvertismentSms",
    "POST /api/sms/register" : "SmsController.sendRegisterCode",
    "POST /api/sms/receive" : "SmsController.receiveAccessCode",
    //CONTACT ROUTES
    "GET /api/chats": "ContactController.getAll",
};
