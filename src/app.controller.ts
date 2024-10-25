import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';

import { AccountService } from './account/account.service';
import { EventDto } from './account/dto/event.dto';

@Controller()
export class AppController {
  constructor(private readonly accountService: AccountService) {}

  @Post('event')
  event(@Body() eventDto: EventDto) {
    return this.accountService.event(eventDto);
  }

  @Get('balance')
  getBalance(@Query('account_id') account_id: string) {
    return this.accountService.getBalance(account_id);
  }

  @Post('reset')
  @HttpCode(200)
  reset() {
    return this.accountService.reset();
  }
}