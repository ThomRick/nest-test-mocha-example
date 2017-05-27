import {Test} from '@nestjs/testing';
import {UserService} from './user.service';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import {UserRepository} from '../repositories/user.repository';

describe('UserService', () => {
  let sandbox: sinon.SinonSandbox;
  let service: UserService;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    Test.createTestingModule({
      components: [
        UserService,
        UserRepository
      ]
    });
    service = Test.get(UserService);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getAll()', () => {
    it('should call UserRepository.readAll()', done => {
      const repository: UserRepository = Test.get(UserRepository);
      const readAllStub: SinonStub = sandbox.stub(repository, 'readAll').callsFake(() => Promise.resolve());
      service.getAll().then(() => {
        expect(readAllStub.calledOnce).to.be.true;
        done();
      }).catch(error => {
        done(error);
      });
    });
  });
});
