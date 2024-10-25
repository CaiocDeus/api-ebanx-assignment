import { Injectable, NotFoundException } from '@nestjs/common';

import { EventDto } from './dto/event.dto';
import { Account, EventResponse } from './entities/account.entity';

@Injectable()
export class AccountService {
  private accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  getBalance(account_id: string) {
    const account = this.accounts.find(({id}) => id === account_id);
    if (!account) throw new NotFoundException();

    return account.balance
  }

  event(event: EventDto): EventResponse {
    switch (event.type) {
      case 'deposit':
        return this.deposit(event);

      case 'transfer':
        return this.transfer(event);

      case 'withdraw':
        return this.withdraw(event);
    }
  }

  reset(): string {
    this.accounts = [];

    return 'OK';
  }

  deposit(event: EventDto): EventResponse {
    let account = this.accounts.find(({id}) => id === event.destination);

    if (account) {
      account.balance += event.amount;
    } else {
      account = {id: event.destination, balance: event.amount};
      this.accounts.push(account);
    }

    return { destination: account };
  }

  withdraw(event: EventDto): EventResponse {
    const account = this.accounts.find(({id}) => id === event.origin);

    if (!account) {
      throw new NotFoundException();
    }

    account.balance -= event.amount;

    return { origin: account };
  }

  transfer(event: EventDto): EventResponse {
    const accountOrigin = this.accounts.find(({id}) => id === event.origin);
    let accountDestination = this.accounts.find(({id}) => id === event.destination);

    if (!accountOrigin) {
      throw new NotFoundException();
    }

    accountOrigin.balance -= event.amount;

    if (accountDestination) {
      accountDestination.balance += event.amount;
    } else {
      accountDestination = {id: event.destination, balance: event.amount};
      this.accounts.push(accountDestination);
    }

    return { origin: accountOrigin, destination: accountDestination };
  }
}
