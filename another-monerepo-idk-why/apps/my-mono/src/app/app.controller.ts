import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('Obamatown')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}

// function ControllerWithLogDecorator(route: string) {
//   const logRouteMiddleware = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
//     const path = Reflect.getMetadata('path', target.constructor);
//     console.log('the Path is ' + path);
//   }
//   return applyDecorators(
//     Controller(route),
//     logRouteMiddleware
//   )
// }

// function GetControllerRouteUsingReflectionAndLogDecorator() {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const controller = new AppController(new AppService());
//     const controllerRoute = Reflect.getMetadata('path', controller.constructor);
//     const controllerRouteMethod = Reflect.getMetadata(
//       'path',
//       controller.getData,
//     );
//     console.log(controllerRoute);
//     console.log(controllerRouteMethod);
//   };
// }