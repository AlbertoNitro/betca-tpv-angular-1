import {Component} from '@angular/core';
import {ArticleFamily} from './articles-families.model';
import {ArticleFamilyService} from './articles-families.service';

@Component({
  selector: 'app-articles-families',
  templateUrl: './articles-families.component.html'
})
export class ArticlesFamiliesCRUDComponent {
  static URL = 'articles-families';
  title = 'Articles Families';
  columns = ['description'];
  data: ArticleFamily[];

  constructor(private articleFamilyService: ArticleFamilyService) {
    articleFamilyService.readAllFamilies().subscribe(data => this.data = data);
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
