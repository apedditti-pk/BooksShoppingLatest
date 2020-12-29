import * as request from 'supertest';
import * as express from 'express';
import * as main from '../../main';
import {
  formattedBookMock,
  MockBookForTesting,
} from '../../../../../libs/mockDb';

const nock = require('nock');
describe('Test routes', () => {
  const app = express();
  beforeEach(() => {
    nock('https://www.googleapis.com')
      .get('/books/v1/volumes?q=mock')
      .reply(200, MockBookForTesting);

    nock('https://www.googleapis.com')
      .get('/books/v1/volumes?q=')
      .reply(401, new Error());
  });

  it('GET /search/', (done) => {
    request(main.app)
      .get('/search/')
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it('GET /search/:searchterm', (done) => {
    request(main.app)
      .get('/search/mock')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});
