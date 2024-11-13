import { Injectable, NotFoundException } from '@nestjs/common';
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
  async findAll() {
    const properties = await this.propertyRepository.find();
    if (!properties) throw new NotFoundException();
    return properties;
  }
  async findOne(id: number) {
    const property = await this.propertyRepository.findOne({
      where: {
        id,
      },
    });
    if (!property) throw new NotFoundException();
    return property;
  }
  async create(dto: CreatePropertyDto) {
    return await this.propertyRepository.save(dto);
  }
  async update() {}
  async delete() {}
}
