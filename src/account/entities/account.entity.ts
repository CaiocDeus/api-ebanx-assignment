export class Account {
  id: string;
  balance: number;
}

export class EventResponse {
  origin?: Account;
  destination?: Account;
}