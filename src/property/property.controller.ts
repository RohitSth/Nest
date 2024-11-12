import { Controller, Get, Param, Post, Put } from '@nestjs/common';

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

  @Get(':id') //dynamic parameter
  findOne(@Param('id') id: string) {
    return `This action returns a property ${id}`;
  }
}
