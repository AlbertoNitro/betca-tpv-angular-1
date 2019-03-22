import {Component, OnInit} from '@angular/core';

import {ArticleDetailModel} from './article-detail-model';
import {ArticleQueryModel} from '../shared/article-query.model';
import {ArticleCreateUpdateDialogComponent} from './article-create-update-dialog/article-create-update-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ArticleService} from '../shared/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {
  static URL = 'articles';

  article: ArticleQueryModel;

  title = 'Articles Management';
  columns = ['code', 'description', 'retailPrice', 'stock'];
  data: ArticleDetailModel[];

  constructor(private dialog: MatDialog, private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.readAll().subscribe(
      articleList => this.data = articleList
    );
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

