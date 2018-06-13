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
  "GET /api/user" : "UserController.get",
  "POST /api/user" : "UserController.add",
  "PUT /api/user" : "UserController.update",
  "POST /api/connect" : "UserController.connect",
  "GET /api/disconnect" : "UserController.disconnect",
  //SMS ROUTES
  "POST /api/sms/advertising" : "SmsController.sendAdvertismentSms",
  "POST /api/sms/register" : "SmsController.sendRegisterCode"
};
