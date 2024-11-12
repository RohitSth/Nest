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

  //   @Get(':id') //dynamic parameter
  //   findOne(@Param('id') id: string) {
  //     return `This action returns a property ${id}`;
  //   }

  //   @Get(':id/:slug') //this returns an object with id and slug. Eg. {id: 1, slug: 'property-1'}
  //   findOne(@Param() id) {
  //     return id;
  //   }

  // Can also be written as
  @Get(':id/:slug') //this returns an object with id and slug. Eg. {id: 1, slug: 'property-1'}
  findOne(@Param('id') id, @Param('slug') slug) {
    return `id: ${id}, slug: ${slug}`;
  }
}
