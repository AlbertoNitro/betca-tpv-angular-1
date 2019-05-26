import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stock-manager',
  templateUrl: './stock-manager.component.html',
  styleUrls: ['./stock-manager.component.css']
})
export class StockManagerComponent implements OnInit {
  static URL = 'stock-manager';
  columns = ['code', 'description', 'retailPrice', 'stock'];

  constructor() {
  }

  ngOnInit() {
  }

}
