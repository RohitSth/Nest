import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PropertyController],
  providers: [
    {
      provide: APP_PIPE,
      // useClass: ValidationPipe, // Global validation without any options -- useClass

      // Global validation with options -- useValue
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class PropertyModule {}
