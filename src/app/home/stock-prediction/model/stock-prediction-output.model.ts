import {PeriodType} from './period-type.enum';

export interface StockPredictionOutput {
  periodType: PeriodType;
  periodNumber: number;
  stock: number;
}
