/* -------
 * Testing
 * -------
 *
 *  This file described tests.
 *  It uses mocha to define the test and chai to assert the cases.
 *  chai-http is used to provide HTTP capabilities to chai.
 *
 *  Every test is defined with 'describe(string, cbk)'.
 *  Every test case is defined with 'it(string, cbk)'.
 *  To run the test, simply run 'npm test'.
 *
 *  You might want to run the test against an other database.
 *  To do so, change the DB environment variable.
 *  For example: DB=<other_db_uri> npm test
 *
 *  More information can be found in the documentation of mocha:
 *  https://mochajs.org/#getting-started
 */

const chai = require('chai');
const chaiHttp = require('chai-http');

// Allow to use should during the test.
chai.should();
// Allow to use HTTP requests during the tests.
chai.use(chaiHttp);

// Import the Express server to run tests against it.
const server = require('../app');

describe('GET /_status', () => {
  it('should be able to retrieve the status of the service', (done) => {
    chai
      .request(server)
      .get('/_status')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('version').a('string');
        res.body.should.have.property('env').a('string');
        done();
      });
  });
});

describe('GET /_health', () => {
  it('should be able to retrieve the status of the service', (done) => {
    chai
      .request(server)
      .get('/_health')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('uptime').a('number');
        res.body.should.have.property('timestamp').a('number');
        res.body.should.have.property('status').eql('OK');
        done();
      });
  });
});

describe('GET /*', () => {
  it('should return a 404', (done) => {
    chai
      .request(server)
      .get(`/${Math.random().toString(36).substring(2, 15)}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

// Include the API tests.
require('./v1/example');
