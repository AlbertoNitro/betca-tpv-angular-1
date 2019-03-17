import {PeriodType} from './period-type.enum';

export interface StockPredictionOutputDto {
  period: PeriodType;
  periodNumber: number;
  stock: number;
}
