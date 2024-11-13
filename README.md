# NestJS Basics - Quick Start Guide

## Table of Contents

- [Project Setup](#project-setup)
- [Routing](#routing)
  - [Basic Routes](#basic-routes)
  - [Dynamic Routes](#dynamic-routes)
  - [Multiple Parameters](#multiple-parameters)
- [Project Generation Commands](#project-generation-commands)
- [Request Handling](#request-handling)
  - [Body Handling](#body-handling)
  - [HTTP Status Codes](#http-status-codes)
- [Data Transformation & Validation](#data-transformation--validation)
  - [Built-in Pipes](#built-in-pipes)
  - [Custom Pipes](#custom-pipes)

## Project Setup

Create a new NestJS project using the CLI:

```bash
nest new project-name
```

This command creates a new NestJS project with all the necessary boilerplate code and dependencies.

## Routing

### Basic Routes

Routes in NestJS are defined using decorators in controller files. Here's how to set up basic routes:

```typescript
@Controller('user') // Defines the base route prefix
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all') // GET /user/all
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### Dynamic Routes

Handle dynamic parameters in routes using the `@Param` decorator:

```typescript
@Get(':id')  // GET /user/:id
findOne(@Param('id') id: string) {
  return `This action returns a property ${id}`;
}
```

### Multiple Parameters

There are two ways to handle multiple route parameters:

1. Accessing all parameters as an object:

```typescript
@Get(':id/:slug')
findOne(@Param() params) {
  // Returns object: { id: '1', slug: 'property-1' }
  return params;
}
```

2. Accessing specific parameters individually:

```typescript
@Get(':id/:slug')
findOne(@Param('id') id: string, @Param('slug') slug: string) {
  return `id: ${id}, slug: ${slug}`;
}
```

## Project Generation Commands

NestJS provides several CLI commands to generate project components:

```bash
# Generate a new module
nest g module module-name

# Generate a new controller
nest g co controller-name

# Other common commands:
# nest g s   # Generate a service
# nest g pi  # Generate a pipe
# nest g mi  # Generate a middleware
```

## Request Handling

### Body Handling

Handle POST request bodies using the `@Body` decorator:

1. Access entire request body:

```typescript
@Post()
create(@Body() body) {
  return body;
}
```

2. Access specific body properties:

```typescript
@Post()
create(@Body('name') name: string) {
  return name;
}
```

### HTTP Status Codes

Customize HTTP response status codes using the `@HttpCode` decorator:

```typescript
@Post()
@HttpCode(202)  // Sets response status code to 202 Accepted
create(@Body('name') name: string) {
  return name;
}
```

Common HTTP status codes:

- 200: OK (default for GET requests)
- 201: Created (default for POST requests)
- 202: Accepted
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Data Transformation & Validation

NestJS provides powerful pipes for data transformation and validation. Pipes can transform input data to the desired format and validate it before it reaches the route handler.

### Built-in Pipes

1. **ParseIntPipe**: Automatically transforms string values to integers

```typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  console.log(typeof id); // 'number'
  return `This action returns a property ${id}`;
}
```

2. **ParseFloatPipe**: Transforms string values to floating-point numbers

```typescript
@Get(':price')
findByPrice(@Param('price', ParseFloatPipe) price: number) {
  return `Items with price ${price}`;
}
```

3. **ParseBoolPipe**: Transforms string values to booleans

```typescript
@Get(':isActive')
findActive(@Param('isActive', ParseBoolPipe) isActive: boolean) {
  return `Active status: ${isActive}`;
}
```

4. **ParseArrayPipe**: Transforms array-like string values to arrays

```typescript
@Post()
createMany(@Body(new ParseArrayPipe({ items: Number })) items: number[]) {
  return items;
}
```

5. **For search Queries**:

```typescript
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    console.log(typeof id); // number
    console.log(typeof sort); // boolean

    return `This action returns a property ${id}`;
  }
```

### Custom Pipes

You can create custom pipes for specific transformation needs:

```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CustomTransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Your transformation logic here
    return transformedValue;
  }
}
```

Usage:

```typescript
@Get(':id')
findOne(@Param('id', CustomTransformPipe) id) {
  return `Transformed value: ${id}`;
}
```

### Class Transformers and Validators

Install the dependenies

```bash
npm i --save class-validator class-transformer
```

```bash
// In /property/dto/createProperty.dto.ts
import { IsInt, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsInt()
  area: number;
}

```

To remove any extra fields that are not defined in the CreatePropertyDto

```bash
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true })) //whitelist: true will remove any extra fields that are not defined in the CreatePropertyDto
  create(@Body() body: CreatePropertyDto) {
    return body;
  }
```

To throw an error if any extra fields are present in the request body

```bash
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) //whitelist: true will remove any extra fields that are not defined in the CreatePropertyDto\n//forbidNonWhitelisted: true will throw an error if any extra fields are present in the request body
  create(@Body() body: CreatePropertyDto) {
    return body;
  }
```

Another way to do it

```bash
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // another way of doing it
    body: CreatePropertyDto,
  ) {
    return body;
  }
```

- For custom error message and more validation

```typescript
import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 20, { message: 'Name is too short or too long' })
  name: string;
  @IsString()
  description: string;
  @IsInt()
  @IsPositive()
  area: number;
}
```

## How to make groups so that we can use the same but slightly changed validation for create and update

```typescript
@Post()
  create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        groups: ['create'],
        always: true,
      }),
    )
    body: CreatePropertyDto,
  ) {
    return body;
  }

  @Patch(':id')
  update(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        groups: ['update'],
        always: true,
      }),
    )
    body: CreatePropertyDto,
  ) {
    return body;
  }

  // Then in dto

  import { IsInt, IsPositive, IsString, Length } from 'class-validator';

  export class CreatePropertyDto {
    @IsString()
    @Length(2, 20, { message: 'Name is too short or too long' })
    name: string;
    @IsString()
    @Length(2, 10, { groups: ['create'] })
    @Length(1, 15, { groups: ['update'] })
    description: string;

    @IsInt()
    @IsPositive()
    area: number;
  }

```

## Global Validation

```bash
// In the main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


// So after we add global validation in this we can remove the validation form endpoints in the controller
  @Patch(':id')
  update(
    @Body(
    //   new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     groups: ['update'],
    //     always: true,
    //   }),
    )
    body: CreatePropertyDto,
  ) {
    return body;
  }

```

## NOTE :: Groups doesnot work on global validation

## To use global validation in only a specificc module

Move the useGlobalPipes from main.ts and use it as a provider in the module like this as shown below

```typescript
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
```

## Transform the incoming request data to the desired type and enable the implicit conversion of the incoming request data to the desired type

```typescript
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
        transform: true, // This will transform the incoming request data to the desired type
        transformOptions: { enableImplicitConversion: true }, // This will enable the implicit conversion of the incoming request data to the desired type
      }),
    },
  ],
})
export class PropertyModule {}
```

## Validation for params and searh query

```typescript

  // make a dto for the param along with the validation
  import { IsInt, IsPositive } from 'class-validator';

  export class idParamDto {
    @IsInt()
    @IsPositive()
    id: number;
  }

 // Then type it in the endpoint like so
   @Patch(':id')
  update(
    @Param() param: idParamDto,
    @Body()
    body: CreatePropertyDto,
  ) {
    return body;
  }


```

## Custom Transform Pipes

```typescript
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable() // This is a provider that can be injected into other components -- to use this outside of the module
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Id must be a number');
    }
    if (val <= 0) {
      throw new BadRequestException('Id must be a positive number');
    }
    return val;
  }
}

// then use it like this

 @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertyDto,
  ) {
    return body;
  }
```

## Validation with ZOD

```typescript
// To use zod for validation, we don't need to define the provider for global validation in the module
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

//Create a zod dto -- createPropertyZod.dto.ts
import { z } from 'zod';

export const createPropertySchema = z
  .object({
    name: z.string(),
    description: z.string().min(5),
    area: z.number().positive(),
  })
  .required();

export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;

// then we can create a zodValidationPipeline.ts
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    const parsedValue = this.schema.safeParse(value);
    if (parsedValue.success) return parsedValue.data;
    throw new BadRequestException(parsedValue.error.format());
  }
}

// then just use it in endpoint in the controller
  @Post()
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(
    @Body()
    body: CreatePropertyZodDto,
  ) {
    return body;
  }
```

## To Access Headers

```typescript
// Just use this in the endpoint
  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertyDto,
    @Headers('host') header,
  ) {
    return header;
  }
```

## To validate headers

```typescript
// make a headers dto
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class HeadersDto {
  @IsString()
  @Expose({ name: 'access-token' })
  accessToken: string;
}

// then use it in the endpoint
  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertyDto,
    @Headers('host') header: HeadersDto,
  ) {
    return header;
  }


// but it will not work for the headers, so we need to create a custom decorator for validation


// so to create a custom decorator

// create a request-header in pipes
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const RequestHeader = createParamDecorator(
  async (targetDto: any, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    const dto = plainToInstance(targetDto, headers, {
      excludeExtraneousValues: true,
    });
    await validateOrReject(dto);
    return dto;
  },
);


// then use it like this
  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertyDto,
    @RequestHeader(new ValidationPipe({ validateCustomDecorators: true }))
    header: HeadersDto,
  ) {
    return header;
  }

```

## Inversion Of Control

- Normally a class would create it's own dependencies but with Inversion Of Control an external entity like a framework takes the control and create the dependencies for the classes.

```typescript
//Dependency injection can be implemented like this

@Controller('property')
export class PropertyController {
  properyService: PropertyService;
  constructor(propertyService: PropertyService) {
    // Don't create your dependencies like this in a real application, instead use dependency injection
    // this.properyService = new PropertyService();

    this.properyService = propertyService; // This is how we can use dependency injection
  }



//SO this will benefit us to do this

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


```

## Dependency Injection

```typescript

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {
    // Don't create your dependencies like this in a real application, instead use dependency injection
    // this.properyService = new PropertyService();
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }
```

## Type ORM

Installation

```bash
npm i --save @nestjs/typeorm typeorm mysql2

// for postgres
npm i --save @nestjs/typeorm typeorm pg
```

Setting up TypeORM

```typescript
//After installation, in app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';

@Module({
  imports: [PropertyModule, TypeOrmModule.forRoot(pgConfig)], // Add TypeOrmModule here along with the config
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// For the config, in the root directory, make a dbConfig.ts file
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  url: 'your db url',
  type: 'postgres',
  port: 3306,
  entities: [],
  synchronize: true, // This will automatically create the tables in the database // For development only, use false for production
};
```

## Best Practices

1. Always specify types for parameters and return values
2. Use meaningful route names that follow REST conventions
3. Group related functionality into modules
4. Use services for business logic
5. Implement error handling using exception filters
6. Use DTOs (Data Transfer Objects) for request validation
7. Use appropriate pipes for data transformation and validation
8. Implement custom pipes for specific business logic needs

## Additional Resources

- [Official NestJS Documentation](https://docs.nestjs.com/)
- [NestJS GitHub Repository](https://github.com/nestjs/nest)
- [NestJS CLI Documentation](https://docs.nestjs.com/cli/overview)
- [NestJS Pipes Documentation](https://docs.nestjs.com/pipes)
