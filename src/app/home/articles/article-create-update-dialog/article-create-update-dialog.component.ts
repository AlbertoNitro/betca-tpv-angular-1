import {Component, Inject, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';
import {Tax} from './tax';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ArticleService} from '../../shared/article.service';

@Component({
  selector: 'app-article-create-update-dialog',
  templateUrl: './article-create-update-dialog.component.html',
  styleUrls: ['./article-create-update-dialog.component.css']
})

export class ArticleCreateUpdateDialogComponent implements OnInit {

  article: Article;
  modeDialog: string;

  taxes: Tax[] = [{label: 'Free', value: 'FREE'}, {label: 'Super reduced', value: 'SUPER_REDUCED'},
    {label: 'Reduced', value: 'REDUCED'}, {label: 'General', value: 'GENERAL'}];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private articleService: ArticleService) {
    this.article = data.article;
    this.modeDialog = data.mode;
  }

  ngOnInit() {
  }

  create() {
    this.articleService.create(this.article).subscribe();
  }

  update() {
    this.articleService.update(this.article.code, this.article).subscribe();
  }

}
