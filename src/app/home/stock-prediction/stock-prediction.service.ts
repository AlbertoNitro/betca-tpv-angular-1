import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable, of} from 'rxjs';
import {ArticleWithCodeAndDescriptionDto} from './model/article-with-code-and-description-dto.model';
import {StockPredictionOutputDto} from './model/stock-prediction-output-dto.model';
import {StockPredictionInputDto} from './model/stock-prediction-input-dto.model';
import {PeriodType} from './model/period-type.enum';

@Injectable({
  providedIn: 'root'
})
export class StockPredictionService {
  static DUMMY_ARTICLE_LIST: ArticleWithCodeAndDescriptionDto[] = [
    {code: '8400000000017', description: 'Zarzuela - Falda T2'},
    {code: '8400000000024', description: 'Zarzuela - Falda T4'},
    {code: '8400000000031', description: 'descrip-a3'},
    {code: '8400000000048', description: 'descrip-a4'}
  ];
  static DUMMY_STOCK_PREDICTION_OUTPUT_ARRAY: StockPredictionOutputDto[] = [
    {period: PeriodType.WEEK, periodNumber: 1, stock: 1028},
    {period: PeriodType.WEEK, periodNumber: 2, stock: 964},
    {period: PeriodType.WEEK, periodNumber: 3, stock: 900},
    {period: PeriodType.WEEK, periodNumber: 4, stock: 837}
  ];

  constructor(private httpService: HttpService) {
  }

  //TODO: Maybe move to shared/article.service.ts
  readAllArticleWithCodeAndDescriptionDto(): Observable<ArticleWithCodeAndDescriptionDto[]> {
    // TODO: change DUMMY implement for API request (GET /offers)
    //return this.httpService.get(ApiEndpoint.STOCK_PREDICTION);
    return of(StockPredictionService.DUMMY_ARTICLE_LIST);
  }

  calculate(stockPredictionInputDto: StockPredictionInputDto): Observable<StockPredictionOutputDto[]> {
    // TODO: change DUMMY implement for API request (GET /offers)
    //return this.httpService.get(ApiEndpoint.STOCK_PREDICTION);
    return of(StockPredictionService.DUMMY_STOCK_PREDICTION_OUTPUT_ARRAY);
  }
}
