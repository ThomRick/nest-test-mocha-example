import {Test} from '@nestjs/testing';
import {UserService} from './user.service';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import {UserRepository} from '../repositories/user.repository';
import {UserDetail} from '../../../core/interfaces/user-detail.interface';
import {User} from '../../../core/interfaces/user.interface';

describe('UserService', () => {
  let sandbox: sinon.SinonSandbox;

  let service: UserService;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
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

  describe('#getAll()', () => {
    let readAllStub: SinonStub;

    beforeEach(() => {
      const repository: UserRepository = Test.get(UserRepository);
      readAllStub = sandbox.stub(repository, 'readAll');
    });

    it('should call UserRepository.readAll()', async () => {
      readAllStub.callsFake(() => Promise.resolve([]));
      await service.getAll();
      expect(readAllStub.calledOnce).to.be.true;
    });

    it('should map UserDetail[] from repository to User[]', async () => {
      const userDetail: UserDetail = { id: 0, nickname: 'nickname', age: 18 };
      const user: User = { id: 0, nickname: 'nickname'};
      readAllStub.callsFake(() => Promise.resolve([ userDetail ]));
      const users: User[] = await service.getAll();
      expect(users).to.be.deep.equal([ user ]);
    });
  });
});
