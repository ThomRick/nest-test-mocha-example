import {Module} from '@nestjs/common';
import {UserController} from './controllers/user.controller';
import {UserService} from './services/user.service';
import {UserRepository} from './repositories/user.repository';

@Module({
  controllers: [
    UserController
  ],
  components: [
    UserService,
    UserRepository
  ]
})
export class UserModule {}
