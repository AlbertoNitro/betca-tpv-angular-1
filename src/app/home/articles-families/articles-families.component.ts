import {Component} from '@angular/core';
import {ArticleFamily} from './articles-families.model';
import {ArticleFamilyService} from './articles-families.service';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {MatDialog} from '@angular/material';
import {ArticlesFamiliesCreateDialogComponent} from './articles-families-create-dialog.component';

@Component({
  selector: 'app-articles-families',
  templateUrl: './articles-families.component.html'
})
export class ArticlesFamiliesCRUDComponent {
  static URL = 'articles-families';
  title = 'Articles Families';
  columns = ['description'];
  data: ArticleFamily[];

  constructor(private articleFamilyService: ArticleFamilyService, private dialog: MatDialog) {
    articleFamilyService.readAllFamilies().subscribe(data => this.data = data);
  }

  create() {
    // TODO
    this.dialog.open(ArticlesFamiliesCreateDialogComponent, {width: '30%', height: '55%'});
  }

  delete(articleFamily: ArticleFamily) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.articleFamilyService.deleteFamilyComposite(articleFamily.description).subscribe(
            () => this.data = this.data.filter(item => item !== articleFamily)
          );
        }
      });
  }

  update(articleFamily: ArticleFamily) {
    // TODO
  }
}
