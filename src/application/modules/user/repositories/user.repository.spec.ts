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
    it('should call InMemoryUserDatabase.create()', async () => {
      const createStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'create').callsFake(() => Promise.resolve());
      await repository.create({ nickname: 'nickname' });
      expect(createStub.calledOnce).to.be.true;
    });
  });

  describe('#readAll()', () => {
    it('should call InMemoryUserDatabase.read()', async () => {
      const readStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'read').callsFake(() => Promise.resolve());
      await repository.readAll();
      expect(readStub.calledOnce).to.be.true;
    });
  });

  describe('#update()', () => {
    it('should call InMemoryUserDatabase.update()', async ()=> {
      const updateStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'update').callsFake(() => Promise.resolve());
      await repository.update({ id: 1, nickname: 'nickname', age: 18 });
      expect(updateStub.calledOnce).to.be.true;
    });
  });

  describe('#delete()', () => {
    it('should call InMemoryUserDatabase.delete()', async ()=> {
      const deleteStub: sinon.SinonStub = sandbox.stub(InMemoryUserDatabase.prototype, 'delete').callsFake(() => Promise.resolve());
      await repository.delete({ id: 1, nickname: 'nickname' });
      expect(deleteStub.calledOnce).to.be.true;
    });
  });
});
