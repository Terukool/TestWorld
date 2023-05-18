import { Delete, Get, Param, Post } from '@nestjs/common';

import { HeliosController } from './helios-controller';

@HeliosController(':baseId/Workspaces/:id')
export class AppController {
  @Get('1:/:anotherId')
  getDataById(@Param('id') id: string, @Param('baseId') baseId: string, @Param('anotherId') anotherId: string) {
    return id + baseId + anotherId + ' found';
  }

  @Post('2')
  getSecondDataById(@Param('id') id: string) {
    return id + ' found';
  }

  @Delete('3')
  getThirdDataById(@Param('id') id: string) {
    return id + ' found';
  }

  @Get('4')
  getFourthDataById(@Param('id') id: string) {
    return id + ' found';
  }

  @Get('5')
  getFifthDataById(@Param('id') id: string) {
    return id + ' found';
  }
}