import {Shopping} from '../cashier-opened/shopping-cart/shopping.model';

export interface Budget {
  code: string;
  shoppingCart: Shopping[];
}
