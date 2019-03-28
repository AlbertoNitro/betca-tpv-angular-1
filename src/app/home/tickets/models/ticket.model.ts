import {ShoppingTicket} from './shopping-ticket.model';

export interface Ticket {
  id: string;
  shoppingTicket: Array<ShoppingTicket>;
}
