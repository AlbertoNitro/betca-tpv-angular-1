import {PeriodicityType} from './periodicity-type.enum';

export interface StockPredictionInputDto {
  articleCode: string;
  periodicityType: PeriodicityType;
  periodsNumber: number;
}
