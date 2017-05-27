import {Test} from '@nestjs/testing';
import {UserRepository} from './user.repository';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {InMemoryUserDatabase} from '../../../core/databases/in-memory-user.database';

describe('UserRepository', () => {
  let sandbox: sinon.SinonSandbox;

  let repository: UserRepository;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    Test.createTestingModule({
      components: [
        UserRepository
      ]
    });
    repository = Test.get(UserRepository);
  });

  describe('#create()', () => {
    it('should call InMemoryUserDatabase.create()', done => {
      const createStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'create').callsFake(() => Promise.resolve());
      repository.create({ nickname: 'nickname' })
        .then(() => {
          expect(createStub.calledOnce).to.be.true;
          done();
        })
        .catch(error => {
          done(error);
        });
    });
  });

  describe('#readAll()', () => {
    it('should call InMemoryUserDatabase.read()', done => {
      const readStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'read').callsFake(() => Promise.resolve());
      repository.readAll().then(()=> {
        expect(readStub.calledOnce).to.be.true;
        done();
      });
    });
  });

  describe('#update()', () => {
    it('should call InMemoryUserDatabase.update()', done => {
      const updateStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'update').callsFake(() => Promise.resolve());
      repository.update({ id: 1, nickname: 'nickname', age: 18 }).then(()=> {
        expect(updateStub.calledOnce).to.be.true;
        done();
      });
    });
  });

  describe('#delete()', () => {
    it('should call InMemoryUserDatabase.delete()', done => {
      const deleteStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'delete').callsFake(() => Promise.resolve());
      repository.delete({ id: 1, nickname: 'nickname' }).then(()=> {
        expect(deleteStub.calledOnce).to.be.true;
        done();
      });
    });
  });
});
