import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';
import { PropertyService } from './property.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/data-services/pg/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])], // This will import the Property entity into the PropertyModule
  controllers: [PropertyController],
  providers: [
    {
      provide: APP_PIPE,
      // useClass: ValidationPipe, // Global validation without any options -- useClass

      // Global validation with options -- useValue
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true, // This will transform the incoming request data to the desired type
        transformOptions: { enableImplicitConversion: true }, // This will enable the implicit conversion of the incoming request data to the desired type
      }),
    },
    PropertyService,
  ],
})
export class PropertyModule {}
