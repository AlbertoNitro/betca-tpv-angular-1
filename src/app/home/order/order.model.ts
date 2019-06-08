
export interface Order {
  id: number;
  descriptionOrders: string;
  descriptionArticles: string;
  requiredAmount: number;
  finalAmount: number;
  openingDate?: Date;
  closingDate?: Date;
}

export class orderClose {
  id: number;
    orderLine: orderLine;
}

export interface orderLine {
  Article: {
    code: number
  }
  id: number;
  descriptionOrders: string;
  descriptionArticles: string;
  requiredAmount: number;
  finalAmount: number;
}
