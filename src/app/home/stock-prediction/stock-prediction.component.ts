import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stock-prediction',
  templateUrl: './stock-prediction.component.html',
  styleUrls: ['./stock-prediction.component.css']
})
export class StockPredictionComponent implements OnInit {
  static URL = 'stock-prediction';

  constructor() {
  }

  ngOnInit() {
  }

}
