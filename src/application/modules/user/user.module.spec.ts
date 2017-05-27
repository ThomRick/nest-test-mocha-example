import {INestApplication} from '@nestjs/common/interfaces/nest-application.interface';
import {NestFactory} from '@nestjs/core';
import {UserModule} from './user.module';
import * as supertest from 'supertest';
import * as superagent from 'superagent';
import {expect} from 'chai';
import {Application} from 'express';
import {ExpressAdapter} from '@nestjs/core/adapters/express-adapter';

describe('UserModule', () => {
  let instance: Application;
  let application: INestApplication;

  beforeEach(() => {
    instance = ExpressAdapter.create();
    application = NestFactory.create(UserModule, instance);
    application.init();
  });

  describe('#endpoint /users', () => {
    it('should expose GET method', done => {
      supertest(instance)
        .get('/users')
        .end((error, response: superagent.Response) => {
          expect(response.status).to.not.be.equal(404);
          done();
        });
    });

    it('should expose POST method', done => {
      supertest(instance)
        .post('/users')
        .send(JSON.stringify({ nickname: 'nickname' }))
        .end((error, response: superagent.Response) => {
          expect(response.status).to.not.be.equal(404);
          done();
        });
    });
  });

});
