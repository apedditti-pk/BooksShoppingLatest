const request = require('supertest');
import * as main from './main';

describe('app initialization', () => {
  it('GET /api', (done) => {
    request(main.app)
    .get('/api')
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      done();
    });
  });
});