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

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(
    @Body()
    dto: CreatePropertyDto,
  ) {
    return this.propertyService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertyDto,
    @RequestHeader(new ValidationPipe({ validateCustomDecorators: true }))
    header: HeadersDto,
  ) {
    return this.propertyService.update();
  }
}
