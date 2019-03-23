import {ShoppingTicket} from './shopping-ticket.model';

export interface Ticket {
  code: string;
  date: string;
  shoppingTicket: Array<ShoppingTicket>;
  total: number;
}
