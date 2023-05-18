import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('BadWorkspaces/:id')
@Controller('BadWorkspaces/:id')
export class BadAppController {
  @ApiParam({ name: 'id' })
  @Get('1')
  getDataById(@Param('id') id: string) {
    return id + ' found';
  }

  @ApiParam({ name: 'id' })
  @Post('2')
  getSecondDataById(@Param('id') id: string) {
    return id + ' found';
  }

  @ApiParam({ name: 'id' })
  @Delete('3')
  getThirdDataById(@Param('id') id: string) {
    return id + ' found';
  }

  @ApiParam({ name: 'id' })
  @Get('4')
  getFourthDataById(@Param('id') id: string) {
    return id + ' found';
  }

  @ApiParam({ name: 'id' })
  @Get('5')
  getFifthDataById(@Param('id') id: string) {
    return id + ' found';
  }
}