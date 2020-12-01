/* ---------------
 * Mongoose schema
 * ---------------
 *
 *  This file describe a mongoose schema.
 *  Schemas are specific to mongoose and help
 *  to define data models.
 *
 *  It uses JSDoc to document the schemas and the models.
 *  To generate the documentation, use 'npm run docs'.
 *  It will generate the documentation under 'out/'
 *  and can be read with any web explorer.
 */

/** Mongoose model to represent an example.
 * @module example/v1/models
 * @requires mongoose
 */

const mongoose = require('mongoose');

/** Example Mongoose schema.
 * @const
 */
const ExampleSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  example: {
    type: String,
    required: true,
  },
});

/** Example Mongoose model.
 * @const
 */
const Example = mongoose.model('Example', ExampleSchema);

// The model is exported to be used used controllers.
module.exports = Example;
