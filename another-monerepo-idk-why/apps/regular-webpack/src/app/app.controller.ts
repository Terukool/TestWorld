import { Delete, Get, Param, Post } from '@nestjs/common';

import { HeliosController } from './helios-controller';
import { ApiParam } from '@nestjs/swagger';

@HeliosController(':baseId/Workspaces/:id')
export class AppController {
  @Get('1/:OptionalId3?')
  getDataById(@Param('id') id: string, @Param('baseId') baseId: string, @Param('OptionalId3') anotherId: number | undefined) {
    console.log('id', id);
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