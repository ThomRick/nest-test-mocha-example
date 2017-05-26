import {Controller, Get, Post, Req, Res} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  public getAll(@Req() request, @Res() response) {
    response.status(200).end();
  }

  @Post()
  public create(@Req() request, @Res() response) {
    response.status(201).end();
  }
}
