import {Article} from "../shared/article.model";

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
  description: string;
  orderLines: Array<any>;
}
