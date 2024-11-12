## Things I'm learning

- To create a new nest project

```bash
nest new project-name
```

- For changing the routes like /user/all

```bash
@Controller('user') // add these in controllers
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all') // add these in controllers
  getHello(): string {
    return this.appService.getHello();
  }
}

```

- To add/generate a new module

```bash
nest g module modulename
```

- To add/generate a new controller

```bash
nest g co modulename
```

- For dynamic routes

```bash
  @Get(':id') //dynamic parameter
    findOne(@Param('id') id: string) {
      return `This action returns a property ${id}`;
  }
```

- For multiple Params

```bash

  @Get(':id/:slug') //this returns an object with id and slug. Eg. {id: 1, slug: 'property-1'}
    findOne(@Param() id) {
      return id;
    }
```

Can also be written as

```bash
@Get(':id/:slug') //this returns an object with id and slug. Eg. {id: 1, slug: 'property-1'}
  findOne(@Param('id') id, @Param('slug') slug) {
    return `id: ${id}, slug: ${slug}`;
  }
```

- To access the body

```bash
  @Post()
  create(@Body() body) {
    return body;
  }
```

- To access specific part of the body

```bash
  @Post() // This will only return what's in the name
  create(@Body('name') name) {
    return name;
  }
```
