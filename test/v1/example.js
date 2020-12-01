/* ----------
 * V1 Testing
 * ----------
 *
 *  This file described tests for the V1.
 *  It uses mocha to define the test and chai to assert the cases.
 *  chai-http is used to provide HTTP capabilities to chai.
 *
 *  Every test is defined with 'describe(string, cbk)'.
 *  Every test case is defined with 'it(string, cbk)'.
 *  To run the test, simply run 'npm test tests/v1'.
 *  Thoses tests are included in the index.js.
 *
 *  More information can be found in the documentation of mocha:
 *  https://mochajs.org/#getting-started
 */

const chai = require('chai');
const chaiHttp = require('chai-http');

// Allow to use should during the tests.
chai.should();
// Allow to use HTTP requests during the tests.
chai.use(chaiHttp);

// Import the Express server to run tests against it.
const server = require('../../app');

// Import mock examples.
const mockExample = require('./mockExample');

describe('POST /v1/example', () => {
  it('should be able to create a new Example', (done) => {
    chai
      .request(server)
      .post('/example')
      .send(mockExample.success)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('createdAt').a('string');
        res.body.should.have.property('example').eql(mockExample.success.example);
        done();
      });
  });

  it('should not be able to create a new Example without a name', (done) => {
    chai
      .request(server)
      .post('/example')
      .send(mockExample.error)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').a('string');
        done();
      });
  });
});
