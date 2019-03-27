export interface TicketQueryInput {
  userMobile?: number;
  dateStart?: Date;
  dateEnd?: Date;
  totalMin?: number;
  totalMax?: number;
  pending?: boolean;
  orderId?: string;
}


