import {ShoppingTicket} from './shopping-ticket.model';

export interface Ticket {
  shoppingTicket: Array<ShoppingTicket>;
  total: number;
}
