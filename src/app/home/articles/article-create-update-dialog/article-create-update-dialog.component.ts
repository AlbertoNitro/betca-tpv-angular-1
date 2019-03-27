import {Component, Inject, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ArticleService} from '../../shared/article.service';
import {GenericMatSelect} from '../../shared/generic-mat-select.model';

@Component({
  selector: 'app-article-create-update-dialog',
  templateUrl: './article-create-update-dialog.component.html',
  styleUrls: ['./article-create-update-dialog.component.css']
})

export class ArticleCreateUpdateDialogComponent implements OnInit {

  article: Article;
  modeDialog: string;
  taxSelected: GenericMatSelect;

  taxTypeList: GenericMatSelect[] = [
    {value: 'FREE', viewValue: 'Free'},
    {value: 'GENERAL', viewValue: 'General'},
    {value: 'REDUCED', viewValue: 'Reduced'},
    {value: 'SUPER_REDUCED', viewValue: 'Super Reduced'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private articleService: ArticleService) {
    this.article = data.article;

    this.taxTypeList.forEach(tax => {
      if (tax.value === this.article.tax) {
        this.taxSelect(tax);
      }
    });

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

  taxSelect(tax) {
    this.taxSelected = {
      value: tax.value,
      viewValue: tax.viewValue
    };
  }
}
