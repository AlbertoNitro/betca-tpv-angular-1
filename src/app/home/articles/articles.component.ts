import {Component} from '@angular/core';

import {ArticleDetailModel} from './article-detail-model';
import {ArticleQueryModel} from '../shared/article-query.model';
import {ArticleCreateUpdateDialogComponent} from './article-create-update-dialog/article-create-update-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent {
  static URL = 'articles';

  article: ArticleQueryModel;

  title = 'Articles Management';
  columns = ['code', 'description', 'retailPrice', 'stock'];
  data: Array<ArticleDetailModel>;

  constructor(private dialog: MatDialog) {
    this.data = [{code: '8400000000001', description: 'Falda', retailPrice: 23, stock: 43}];
  }

  updateData(data) {
    console.log(data);
    this.data = data;
  }

  create() {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Create',
        article: {}
      }
    };

    this.dialog.open(ArticleCreateUpdateDialogComponent, dialogConfig);
  }

  read(article: ArticleQueryModel) {

  }

  update(article: ArticleDetailModel) {
    const dialogConfig: MatDialogConfig = {
      data: {
        mode: 'Update',
        article: {code: article.code}
      }
    };

    this.dialog.open(ArticleCreateUpdateDialogComponent, dialogConfig);
  }

  delete(article: ArticleDetailModel) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          console.log('Delete article');
        }
      });
  }
}

