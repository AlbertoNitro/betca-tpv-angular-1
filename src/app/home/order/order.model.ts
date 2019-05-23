
export interface Order {
  id: number;
  descriptionOrders: string;
  descriptionArticles: string;
  requiredAmount: number;
  finalAmount: number;
  openingDate?: Date;
  closingDate?: Date;
}
