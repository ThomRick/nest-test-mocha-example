import {Test} from '@nestjs/testing';
import {UserController} from './user.controller';
import {expect} from 'chai';
import * as httpMocks from 'node-mocks-http';
import {EventEmitter} from 'events';

describe('UserController', () => {
  let controller: UserController;
  let request: httpMocks.MockRequest;
  let response: httpMocks.MockResponse;

  beforeEach(() => {
    Test.createTestingModule({
      controllers: [
        UserController
      ]
    });
    controller = Test.get(UserController);
  });

  describe('#getAll()', () => {

    beforeEach(() => {
      request = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });
      response = httpMocks.createResponse({
        eventEmitter: EventEmitter
      });
    });

    it('should respond with a status 200', done => {
      response.on('end', () => {
        expect(response._getStatusCode()).to.be.equal(200);
        done();
      });
      controller.getAll(request, response);
    });
  });

  describe('#create()', () => {
    it('should respond with status 201', done => {
      request = httpMocks.createRequest({
        method: 'POST',
        url: '/users',
        body: { nickname: 'nickname' }
      });
      response = httpMocks.createResponse({
        eventEmitter: EventEmitter
      });
      response.on('end', () => {
        expect(response._getStatusCode()).to.be.equal(201);
        done();
      });
      controller.create(request, response);
    });
  });
});
