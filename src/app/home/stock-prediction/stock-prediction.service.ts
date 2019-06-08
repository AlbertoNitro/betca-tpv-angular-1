import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {StockPredictionOutput} from './model/stock-prediction-output.model';
import {StockPredictionInput} from './model/stock-prediction-input.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class StockPredictionService {
  private PARAM_PERIODICITY_TYPE = 'periodicityType';
  private PARAM_PERIODS_NUMBER = 'periodsNumber';

  constructor(private httpService: HttpService) {
  }

  calculate(stockPredictionInput: StockPredictionInput): Observable<StockPredictionOutput[]> {
    const endpointStockPrediction = ApiEndpoint.ARTICLES + `/${stockPredictionInput.articleCode}` + ApiEndpoint.STOCK_PREDICTION;
    return this.httpService.param(this.PARAM_PERIODICITY_TYPE, stockPredictionInput.periodicityType)
      .param(this.PARAM_PERIODS_NUMBER, String(stockPredictionInput.periodsNumber))
      .get(endpointStockPrediction);
  }
}
