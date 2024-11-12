import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'This action returns all properties';
  }

  @Post()
  create() {
    return 'This action adds a new property';
  }

  @Put()
  update() {
    return 'This action updates a property';
  }
}
