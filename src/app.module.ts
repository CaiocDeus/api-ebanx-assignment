import { Module } from '@nestjs/common';

import { AccountModule } from './account/account.module';
import { AccountService } from './account/account.service';
import { AppController } from './app.controller';

@Module({
  imports: [AccountModule],
  controllers: [AppController],
  providers: [AccountService],
})
export class AppModule {}
