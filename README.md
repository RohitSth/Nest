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
