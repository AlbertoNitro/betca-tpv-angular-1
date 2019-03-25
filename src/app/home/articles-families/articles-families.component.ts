import {Component} from '@angular/core';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {ArticleFamilyService} from './articles-families.service';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {MatDialog} from '@angular/material';
import {ArticlesFamiliesCreateDialogComponent} from './create-dialog/articles-families-create-dialog.component';
import {ArticlesFamiliesUpdateDialogComponent} from './articles-families-update-dialog.component';
import {FamilyTypes} from './family-types.model';

@Component({
  selector: 'app-articles-families',
  templateUrl: './articles-families.component.html'
})
export class ArticlesFamiliesCRUDComponent {
  static URL = 'articles-families';
  title = 'Articles Families';
  columns = ['description'];
  data: ArticleFamilyMinimum[];
  familyTypes: FamilyTypes = new FamilyTypes();

  constructor(private articleFamilyService: ArticleFamilyService, private dialog: MatDialog) {
    articleFamilyService.readAllFamilyComposites(this.familyTypes.families[2].familyType).subscribe(data => this.data = data);
  }

  create() {
    this.dialog.open(ArticlesFamiliesCreateDialogComponent, {width: '30%', height: '55%'}).afterClosed().subscribe(
      () => this.articleFamilyService.readAllFamilyComposites(this.familyTypes.families[2].familyType).subscribe(data => this.data = data)
    );
  }

  delete(articleFamily: ArticleFamilyMinimum) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.articleFamilyService.deleteFamilyComposite(articleFamily.description).subscribe(
            () => this.data = this.data.filter(item => item !== articleFamily)
          );
        }
      });
  }

  update(articleFamily: ArticleFamilyMinimum) {
    this.dialog.open(ArticlesFamiliesUpdateDialogComponent, {width: '40%', height: '60%', data: articleFamily});
  }
}
