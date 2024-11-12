import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
// import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PropertyController],
  // providers: [
  //   {
  //     provide: APP_PIPE,
  //     // useClass: ValidationPipe, // Global validation without any options -- useClass

  //     // Global validation with options -- useValue
  //     useValue: new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //       transform: true, // This will transform the incoming request data to the desired type
  //       transformOptions: { enableImplicitConversion: true }, // This will enable the implicit conversion of the incoming request data to the desired type
  //     }),
  //   },
  // ],
})
export class PropertyModule {}
