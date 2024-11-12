import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'This action returns all properties';
  }

  //   @HttpCode(202) // This is how we can change the http status code for any the http requests we want
  //   create(@Body('name') name) {
  //     return name;
  //   }
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) //whitelist: true will remove any extra fields that are not defined in the CreatePropertyDto\n//forbidNonWhitelisted: true will throw an error if any extra fields are present in the request body
  create(@Body() body: CreatePropertyDto) {
    return body;
  }

  @Put()
  update() {
    return 'This action updates a property';
  }

  @Get(':id') //dynamic parameter
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    console.log(typeof id);
    console.log(typeof sort);

    return `This action returns a property ${id}`;
  }

  //   @Get(':id/:slug') //this returns an object with id and slug. Eg. {id: 1, slug: 'property-1'}
  //   findOne(@Param() id) {
  //     return id;
  //   }

  // Can also be written as
  //   @Get(':id/:slug') //this returns an object with id and slug. Eg. {id: 1, slug: 'property-1'}
  //   findOne(@Param('id') id, @Param('slug') slug) {
  //     return `id: ${id}, slug: ${slug}`;
  //   }
}
