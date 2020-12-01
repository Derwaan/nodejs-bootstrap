/*

 | \ | |         | |      (_)     |  _ \            | |     | |
 |  \| | ___   __| | ___   _ ___  | |_) | ___   ___ | |_ ___| |
 | . ` |/ _ \ / _` |/ _ \ | / __| |  _ < / _ \ / _ \| __/ __| __| '__/ _` | '_ \
 | |\  | (_) | (_| |  __/_| \__ \ | |_) | (_) | (_) | |_\__ \ |_| | | (_| | |_) |
 |_| \_|\___/ \__,_|\___(_) |___/ |____/ \___/ \___/ \__|___/\__|_|  \__,_| .__/
                         _/ |                                             | |
                        |__/                                              |_|

 * @authors:
 *  - Julien Gomez <julien.gomez@letec.be>
 * @date: december-20
 *
 * This source code is used to give an example of an Node.js/Express server.
 * You are more than welcome to use this code as starting point of any new Node.js service.
 *
 * To run the server, use 'npm start'.
 * To run the server while developping, use 'npm run dev'. It will launch Node.js with nodemon.
 * nodemon will restart the server at any changes.
 * To run the tests, use 'npm test'.
 *  It will check any linting error with ESLint and then run the tests with mocha.
 * To generate the documentations, use 'npm run docs'.
 *  The documentation is genrated under 'out/'.
 *
 * It features:
 * - Basic Express configuration
 * - Errors handler
 * - Swagger/OpenAPI documentation
 * - Health check
 * - Model/Controller
 * - Versioning
 * - Generated documentation with JSDoc
 * - Docker integration
 * - Testing and code coverage
 * - Linting
 */

/* --------------
 * Module imports
 * --------------
 *
 * Import the basic modules used by Node.js.
 *
 * - express:             Fast and minimalist web framework for Node.js.
 * - cors:                Provides an express middleware for cross-origin resource sharing.
 * - morgan:              HTTP request logger express midlleware.
 * - swagger-ui-express:  serve auto-generated Swagger UI.
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

// Create the Express app.
const app = express();

// Import the configuration file and connect to the database.
const config = require('./config');
require('./config/db');

// Import the Express router of the API V1.
const routesV1 = require('./api/v1/routes');

/* -----------
 * Middlewares
 * -----------
 *
 * Express middlewares are loaded using 'app.use'.
 *
 * - morgan() is configured with 'dev' during development and 'common' otherwize.
 * - express.json() is a middleware that will parse the request body into a JSON document.
 * - cors() is the CORS middleware.
 */

/* istanbul ignore next */
if (config.env === 'dev') {
  app.use(morgan('dev'));
} else if (config.env !== 'test') {
  app.use(morgan('common'));
}

app.use(express.json());
app.use(cors());

/* ------
 * Routes
 * ------
 *
 * Express routers are loaded here.
 * The default route '/' use the latest router.
 */

app.use('/', routesV1);
app.use('/v1', routesV1);

/* ---------------
 * Internal routes
 * ---------------
 *
 *  These routes are used for debugging or documenting the service.
 *
 *  - /_status: Return the service environement and current version.
 *
 *  - /_api:    Display the Swagger API with the OpenAPI documentation.
 *
 *  - /_health: This route is used to check that the service is correctly running.
 *              It returns the uptime, the current timestamp and its status.
 *
 *  - /*:       The last middleware will redirect to a 404 error.
 */

app.use('/_status', (req, res) => {
  res.status(200).send({
    env: config.env,
    version: config.version,
  });
});

app.use('/_api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/_health', (req, res) => {
  // The _health endpoint should perform an action to check
  // if the service is alive and healthy.
  res.status(200).send({
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
  });
});

app.use('*', (req, res) => {
  res.status(404).send();
});

app.listen(config.port, () => {
  /* istanbul ignore next */
  if (config.env !== 'test') {
    // eslint-disable-next-line
    console.log(`Listening on http://${config.url}:${config.port}`);
  }
});

// The Express app is exported to be used during tests.
module.exports = app;
