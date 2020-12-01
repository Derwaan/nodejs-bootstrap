/* ----------
 * Controller
 * ----------
 *
 *  This file describe a controller.
 *  A controller will interact with a data model.
 *  Inside the controller, custom Express middlewares are exported.
 *
 *  It uses JSDoc to document the functions and the middlewares.
 *  To generate the documentation, use 'npm run docs'.
 *  It will generate the documentation under 'out/'
 *  and can be read with any web explorer.
 */

/** Example controller.
 * @module example/v1/controllers
 */

// Import the data model.
// Model variables start with an uppercase.
const Example = require('../models/example');

/* -----------
 * Middlewares
 * -----------
 *
 *  The middlewares are exported here.
 *  Middlewares are defined with three args:
 *  - req:  The request object. It contains data about the request.
 *  - res:  The response object. It is used to send a response back to the client.
 *  - next: The next middleware.
 *          If an error occurs, next must be called wit the error as its argument.
 */

/** Create a new Example.
 * It will retrieve the Example value from the JSON body.
 *
 * If an error occurs, status code 400 will be sent.
 * Otherwize, status code 201 will be sent and a new Example will be created.
 *
 * @name createExample
 * @function
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {callback} next - Next middleware.
 */
module.exports.createExample = async (req, res, next) => {
  try {
    const e = new Example(req.body);
    const example = await e.save();

    return res.status(201).send(example);
  } catch (err) {
    return next(err);
  }
};
