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

## Best Practices

1. Always specify types for parameters and return values
2. Use meaningful route names that follow REST conventions
3. Group related functionality into modules
4. Use services for business logic
5. Implement error handling using exception filters
6. Use DTOs (Data Transfer Objects) for request validation

## Additional Resources

- [Official NestJS Documentation](https://docs.nestjs.com/)
- [NestJS GitHub Repository](https://github.com/nestjs/nest)
- [NestJS CLI Documentation](https://docs.nestjs.com/cli/overview)
