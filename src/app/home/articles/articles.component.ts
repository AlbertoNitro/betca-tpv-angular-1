import {Component, OnInit} from '@angular/core';

import {ArticleDetailModel} from '../shared/article-detail-model';
import {ArticleCreateUpdateDialogComponent} from './article-create-update-dialog/article-create-update-dialog.component';
import {ArticleQueryModel} from '../shared/article-query.model';
import {ArticleService} from '../shared/article.service';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

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
  dialogConfig: MatDialogConfig;

  constructor(private dialog: MatDialog, private articleService: ArticleService) {
  }

  ngOnInit(): void {
  }

  updateData(data) {
    console.log(data);
    this.data = data;
  }

  readAll() {
    this.articleService.readAll().subscribe(
      articleList => this.data = articleList
    );
  }

  create() {
    this.dialogConfig = {
      data: {
        mode: 'Create',
        article: {}
      }
    };

    this.dialog.open(ArticleCreateUpdateDialogComponent, this.dialogConfig).afterClosed().subscribe(
      response => {
        if (response) {
          this.readAll();
        }
      }
    );
  }

  update(articleDetailModel: ArticleDetailModel) {
    this.articleService.readOne(articleDetailModel.code).subscribe(
      article => {
        this.dialogConfig = {
          data: {
            mode: 'Update',
            article: article
          }
        };

        this.dialog.open(ArticleCreateUpdateDialogComponent, this.dialogConfig).afterClosed().subscribe(
          response => {
            if (response) {
              this.readAll();
            }
          }
        );
      }
    );

  }

  delete(article: ArticleDetailModel) {
     this.dialogConfig = {
      data: {
        message: 'The article will be deleted.',
        question: 'Are you sure?'
      }
    };

    this.dialog.open(CancelYesDialogComponent, this.dialogConfig).afterClosed().subscribe(
      result => {
        if (result) {
          this.articleService.delete(article.code).subscribe(
            response => {
              if (response) {
                this.readAll();
              }
            });
        }
      }
    );
  }
}
