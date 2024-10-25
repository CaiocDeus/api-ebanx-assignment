import { Injectable, NotFoundException } from '@nestjs/common';

import { EventDto } from './dto/event.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  getBalance(account_id: string) {
    const account = this.accounts.find(({id}) => id === account_id);
    if (!account) throw new NotFoundException('0');

    return account.balance
  }

  event(event: EventDto) {
    switch (event.type) {
      case 'deposit':
        return this.deposit(event);

      case 'transfer':
        return this.transfer(event);

      case 'withdraw':
        return this.withdraw(event);
    }
  }

  reset() {
    this.accounts = [];

    return 'OK';
  }

  deposit(event: EventDto) {
    let account = this.accounts.find(({id}) => id === event.destination);

    if (account) {
      account.balance += event.amount;
    } else {
      account = {id: event.destination, balance: event.amount};

      this.accounts.push(account);
    }

    return { destination: account };
  }

  withdraw(event: EventDto) {
    const account = this.accounts.find(({id}) => id === event.origin);

    if (!account) {
      throw new NotFoundException('0');
    }

    account.balance -= event.amount;

    return { origin: account };
  }

  transfer(event: EventDto) {
    const accountOrigin = this.accounts.find(({id}) => id === event.origin);
    let accountDestination = this.accounts.find(({id}) => id === event.destination);

    if (!accountOrigin) {
      throw new NotFoundException('0');
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
