/* ---------------------
 * MongoDB configuration
 * ---------------------
 *
 *  mongoose is used to communicate with the MongoDB instance.
 */

const mongoose = require('mongoose');

const config = require('.');

// Connect to the MongoDB instance and display a validation message.
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  /* istanbul ignore next */
  if (config.env !== 'test') {
    // eslint-disable-next-line
    console.log('[DATABASE] Successfully connected to ', config.db);
  }
});
