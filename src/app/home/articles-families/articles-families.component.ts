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
    console.log($event.valueOf());
    console.log(this.data.toString());
    //Esto no se refleja aunque si que borra
    this.data.splice(1, 1);
    console.log(this.data.toString());
    //Esto tampoco se ve reflejado
    let data2 = this.data;
    data2.splice(0, 1);
    this.data = data2;
    console.log(this.data.toString());
    //Sin embargo esto si que se ve reflejado:
    this.data = [{description: 'Games', familyType: 'ARTICLES'}, {description: 'Books', familyType: 'ARTICLES'}];
    // TODO
  }

  update($event: any) {
    // TODO
  }
}
