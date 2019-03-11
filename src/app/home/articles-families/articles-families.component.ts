import {Component} from '@angular/core';

@Component({
  selector: 'app-articles-families',
  templateUrl: './articles-families.component.html'
})
export class ArticlesFamiliesCRUDComponent {
  static URL = 'articles-families';
  title = 'Articles Families';
  columns = ['Details'];
  data: String;

  constructor() {
  }

  create() {
    // TODO
  }

  delete($event: any) {
    // TODO
  }

  update($event: any) {
    // TODO
  }
}
