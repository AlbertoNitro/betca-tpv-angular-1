
export interface Order {
  id: number;
  descriptionOrders: string;
  descriptionArticles: string;
  requiredAmount: number;
  finalAmount: number;
  openingDate?: Date;
  closingDate?: Date;
}

export interface  orderClose {
  id: number;
    orderLine: orderLine[];
}

export interface orderLine {
  Article: {
    id: number
  }
  id: number;
  descriptionOrders: string;
  descriptionArticles: string;
  requiredAmount: number;
  finalAmount: number;
}
