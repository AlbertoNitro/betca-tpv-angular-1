import {TicketCreation} from "./ticket-creation.model";

export interface InvoiceCreation extends TicketCreation{
  name: String;
  lastName: String;
  address: String;
}
