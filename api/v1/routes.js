/* --------------
 * Express router
 * --------------
 *
 *  This file describe the route used by the server.
 *
 *  It uses JSDoc to document the functions and the routes.
 *  To generate the documentation, use 'npm run docs'.
 *  It will generate the documentation under 'out/'
 *  and can be read with any web explorer.
 */

/** Express router providing V1 related routes.
 * @module example/v1/router
 */

const express = require('express');

const router = express.Router();

const config = require('../../config');

// Import the controller used by the routes.
// A controller is responsible of a specific set of endpoints.
const exampleController = require('./controllers/example');

/** Route serving the POST /example of the V1.
 * @name post/example
 * @function
 * @param {string} path - Route path.
 * @param {callback} middleware - Controller function.
 */
router.post('/example', exampleController.createExample);

/** Error handler of the V1.
 * @name errorHandler
 * @function
 * @param {object} err - Error object.
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {callback} next - Next middleware.
 */
// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
  res.status(400);

  const response = {};

  // istanbul ignore next
  if (config.env === 'dev') {
    response.stack = error.stack;
  }

  response.message = error.toString();

  return res.send(response);
});

// The router is exported back to the Express app.
module.exports = router;
