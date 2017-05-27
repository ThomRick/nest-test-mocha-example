import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {UserService} from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private service: UserService
  ) {}

  @Get()
  public getAll(@Res() response) {
    this.service.getAll().then(users => {
      response.status(200).json(users);
    });
  }

  @Post()
  public create(@Body() body, @Res() response) {
    response.status(201).end();
  }
}
