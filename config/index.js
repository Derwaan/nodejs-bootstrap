/* -------------------
 * Basic configuration
 * -------------------
 *
 *  This file export the configuration used among the entier Express server.
 *  It defines:
 *  - env:  The environment used by the server. 'dev' by default.
 *  - port: The listening port used by express. 3000 is used by default.
 *  - db: The MongoDB URI used to connect to the database.
 *  - version: The current version of the service. It uses the Semantic Versioning 2.0.0.
 */

require('dotenv').config();

/* istanbul ignore next */
module.exports = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || '3000',
  db: process.env.DB || 'mongodb://localhost:27017/dev-nodejs-bootstrap',
  version: process.env.VERSION || '1.0.0',
};
