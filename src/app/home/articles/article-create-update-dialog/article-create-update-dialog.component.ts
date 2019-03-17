import {Component, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';
import {Tax} from './tax';

@Component({
  selector: 'app-article-create-update-dialog',
  templateUrl: './article-create-update-dialog.component.html',
  styleUrls: ['./article-create-update-dialog.component.css']
})

export class ArticleCreateUpdateDialogComponent implements OnInit {

  article: Article;

  taxes: Tax[] = [{label: 'Free', value: 'FREE'}, {label: 'Super reduced', value: 'SUPER_REDUCED'},
    {label: 'Reduced', value: 'REDUCED'}, {label: 'General', value: 'GENERAL'}];

  constructor() {
    this.article = {code: null};
  }

  ngOnInit() {
  }

  create() {
  }

}
