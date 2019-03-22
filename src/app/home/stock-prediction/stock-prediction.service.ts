import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {StockPredictionOutputDto} from './model/stock-prediction-output-dto.model';
import {StockPredictionInputDto} from './model/stock-prediction-input-dto.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class StockPredictionService {
  private PARAM_PERIODICITY_TYPE = 'periodicityType';
  private PARAM_PERIODS_NUMBER = 'periodsNumber';

  constructor(private httpService: HttpService) {
  }

  calculate(stockPredictionInputDto: StockPredictionInputDto): Observable<StockPredictionOutputDto[]> {
    return this.httpService.param(this.PARAM_PERIODICITY_TYPE, stockPredictionInputDto.periodicityType)
      .param(this.PARAM_PERIODS_NUMBER, String(stockPredictionInputDto.periodsNumber))
      .get(ApiEndpoint.ARTICLES + `/${stockPredictionInputDto.articleCode}` + ApiEndpoint.STOCK_PREDICTION);
  }
}
