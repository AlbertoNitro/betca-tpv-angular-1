import {PeriodicityType} from './periodicity-type.enum';

export interface StockPredictionInput {
  articleCode: string;
  periodicityType: PeriodicityType;
  periodsNumber: number;
}
