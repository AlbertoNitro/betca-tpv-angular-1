import { Component } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  static URL = 'articles';
  title = 'Articles management';
  columns = ['Code', 'Description', 'Retail price', 'Stock'];
  data: any[];

  constructor() {
    this.data = [{ code: '8400000000001', description: 'falda', retailPrice: '13€', stock: '123'}];
  }

  create() {
    // TODO
  }

  read($event: any) {
    // TODO
  }

  delete($event: any) {
    // TODO
  }

  update($event: any) {
    // TODO
  }
}
