import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdpipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

interface Service {
  findAll();
  findOne();
  create();
  update();
}

@Controller('property')
export class PropertyController {
  properyService: PropertyService;
  constructor(propertyService: Service) {
    // Don't create your dependencies like this in a real application, instead use dependency injection
    // this.properyService = new PropertyService();

    this.properyService = propertyService; // This is how we can use dependency injection
  }

  @Get()
  findAll() {
    return this.properyService.findAll();
  }

  //   @HttpCode(202) // This is how we can change the http status code for any the http requests we want
  //   create(@Body('name') name) {
  //     return name;
  //   }
  @Post()
  //   @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) //whitelist: true will remove any extra fields that are not defined in the CreatePropertyDto\n//forbidNonWhitelisted: true will throw an error if any extra fields are present in the request body
  create(
    @Body()
    body: CreatePropertyDto,
  ) {
    return this.properyService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertyDto,
    @RequestHeader(new ValidationPipe({ validateCustomDecorators: true }))
    header: HeadersDto,
  ) {
    return this.properyService.update();
  }

  @Get(':id') //dynamic parameter
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    return this.properyService.findOne(id);
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
