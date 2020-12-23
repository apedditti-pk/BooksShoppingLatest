import * as express from 'express';

const nock = require('nock');
const request = require('supertest');
const app = express();

import * as main from '../main';
import * as bookController from './book.controller';
import { formattedBookMock, MockBookForTesting } from '../../../../libs/mockDb';

//app.use(express.urlencoded({ extended: false }));

describe('Book Controller ', () => {
  beforeEach(() => {
    nock('https://www.googleapis.com')
      .get('/books/v1/volumes?q=mock')
      .reply(200, MockBookForTesting);

    nock('https://www.googleapis.com')
      .get('/books/v1/volumes?q=')
      .reply(400, new Error());
  });

  it('test if getting 200 response while getting books successfully', (done) => {
    request(main.app)
      .get('/search/mock')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
       // console.log(res.body);
        expect(res.body).toEqual(formattedBookMock);
        done();
      });
  });

  it('Testing whether getting 400 Bad request error when error occurs', (done) => {
    request(main.app)
      .get('/search/')
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        console.log(' error ' + err);
        done();
      });
  });

});
