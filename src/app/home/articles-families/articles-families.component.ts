import {Component} from '@angular/core';
import {ArticleFamily} from './articles-families.model';

@Component({
  selector: 'app-articles-families',
  templateUrl: './articles-families.component.html'
})
export class ArticlesFamiliesCRUDComponent {
  static URL = 'articles-families';
  title = 'Articles Families';
  columns = ['description'];
  data: ArticleFamily[] = [{description: 'Games'}, {description: 'Books'}];

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

  search() {
  }
}
