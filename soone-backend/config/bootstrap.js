/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {
  
  var admin = require('firebase-admin');

  var serviceAccount = require('../assets/firebase/serviceAccountKey.json');
  
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://soone-3343a.firebaseio.com/'
  });

  return done();

};
