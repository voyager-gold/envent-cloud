const _ = require('lodash');
const defaultConfig = require('./config.default');

/**
 * Configuration for development environment
 */
let devConfig = {
  auth: {
    verifyEmail: false, // If true, require email verification when signing up
    resetPassword: false // If true, be able to reset password via email
  },
  oauth: {
    storeToken: false // If true, the OAuth access_token and refresh_token will be stored in database
  },
  seed: {
    logging: true,
    users: [
      {
        username: 'root',
        email: 'root@cody.codes',
        password: 'password',
        firstName: 'Root',
        lastName: 'Account',
        role: 'root'
      },
      {
        username: 'admin',
        email: 'admin@cody.codes',
        password: 'password',
        firstName: 'Admin',
        lastName: 'Account',
        role: 'admin'
      },
      {
        username: 'user',
        email: 'user@cody.codes',
        password: 'password',
        firstName: 'User',
        lastName: 'Account',
        role: 'user'
      }
    ]
  }
};

devConfig = _.merge({}, defaultConfig, devConfig);

module.exports = devConfig;
