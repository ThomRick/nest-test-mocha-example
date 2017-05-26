import {Module} from '@nestjs/common';
import {UserModule} from './modules';

@Module({
  modules: [
    UserModule
  ]
})
export class ApplicationModule {}
