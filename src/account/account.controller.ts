import { Body, Controller, Get, HttpCode, Post, Query, UseFilters } from '@nestjs/common';
import { NotFoundExceptionFilter } from 'src/shared/filters/not-found.exception.filter';

import { AccountService } from './account.service';
import { EventDto } from './dto/event.dto';
import { EventResponse } from './entities/account.entity';

@UseFilters(NotFoundExceptionFilter)
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('event')
  event(@Body() eventDto: EventDto): EventResponse {
    return this.accountService.event(eventDto);
  }

  @Get('balance')
  getBalance(@Query('account_id') account_id: string): number {
    return this.accountService.getBalance(account_id);
  }

  @Post('reset')
  @HttpCode(200)
  reset(): string {
    return this.accountService.reset();
  }
}
