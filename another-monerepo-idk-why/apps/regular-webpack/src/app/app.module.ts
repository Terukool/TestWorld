import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BadAppController } from './bad.controller';

@Module({
  imports: [],
  controllers: [AppController, BadAppController],
  providers: [AppService],
})
export class AppModule {}
