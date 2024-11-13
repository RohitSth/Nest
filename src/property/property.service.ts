import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}
  async findOne() {}
  async findAll() {}
  async create(dto: CreatePropertyDto) {
    return await this.propertyRepository.save(dto);
  }
  async update() {}
  async delete() {}
}
