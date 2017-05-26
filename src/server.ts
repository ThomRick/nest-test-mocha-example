import {INestApplication} from '@nestjs/common/interfaces/nest-application.interface';
import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './application/application.module';

const application: INestApplication = NestFactory.create(ApplicationModule);
application.listen(8080, () => console.log('Application server listen at port 8080'));
