import {Component} from '@angular/core';
import {ArticleFamilyService} from './articles-families.service';
import {ArticleFamily} from './articles-families.model';

@Component({
  selector: 'app-articles-families-create-dialog',
  templateUrl: './articles-families-create-dialog.component.html'
})
export class ArticlesFamiliesCreateDialogComponent {
  familyTypes = [{familyType: 'ARTICLE', label: 'Article'},
    {familyType: 'SIZES', label: 'Size'}, {familyType: 'ARTICLES', label: 'Family'}];
  familyTypeSelected: object;
  families: ArticleFamily[];
  familySelected: ArticleFamily;

  constructor(private articleFamilyService: ArticleFamilyService) {
    articleFamilyService.readAllFamilies().subscribe(data => this.families = data);
  }
}
