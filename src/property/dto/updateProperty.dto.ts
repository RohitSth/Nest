import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './createProperty.dto';

export class UpdatePropertDto extends PartialType(CreatePropertyDto) {}
