import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {UserService} from '../services/user.service';
import {User} from '../../../core/interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(
    private service: UserService
  ) {}

  @Get()
  public async getAll(@Res() response) {
    const users: User[] = await this.service.getAll();
    response.status(200).json(users);
  }

  @Post()
  public create(@Body() body, @Res() response) {
    response.status(201).end();
  }
}
