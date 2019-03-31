import {Component, Inject, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material';
import {ArticleService} from '../../shared/article.service';
import {GenericMatSelect} from '../../shared/generic-mat-select.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CancelYesDialogComponent} from '../../../core/cancel-yes-dialog.component';

@Component({
  selector: 'app-article-create-update-dialog',
  templateUrl: './article-create-update-dialog.component.html',
  styleUrls: ['./article-create-update-dialog.component.css']
})

export class ArticleCreateUpdateDialogComponent implements OnInit {

  article: Article;
  articleForm: FormGroup;
  modeDialog: string;
  dialogConfig: MatDialogConfig;

  taxTypeList: GenericMatSelect[] = [
    {value: 'FREE', viewValue: 'Free'},
    {value: 'GENERAL', viewValue: 'General'},
    {value: 'REDUCED', viewValue: 'Reduced'},
    {value: 'SUPER_REDUCED', viewValue: 'Super Reduced'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private articleService: ArticleService) {
    this.article = data.article;
    this.modeDialog = data.mode;
  }

  ngOnInit() {
    this.articleForm = new FormGroup({
      code: new FormControl(this.article.code),
      description: new FormControl(this.article.description, [Validators.required]),
      retailPrice: new FormControl(this.article.retailPrice, [Validators.min(0)]),
      reference: new FormControl(this.article.reference),
      provider: new FormControl(this.article.provider),
      stock: new FormControl(this.article.stock, [Validators.min(0)]),
      tax: new FormControl(this.article.tax, [Validators.required]),
      discontinued: new FormControl(this.article.discontinued)
    });
  }

  createOrUpdate() {
    this.modeDialog === 'Create' ? this.create() : this.update();
  }

  create() {
    this.dialogConfig = {
      data: {
        message: 'The article will be created with next code Ean',
        question: 'Are you sure?'
      }
    };

    if (!this.articleForm.value.code) {
      this.dialog.open(CancelYesDialogComponent, this.dialogConfig).afterClosed().subscribe(
        result => {
          if (result) {
            this.saveArticle();
            return true;
          }
        });
    } else {
      this.saveArticle();
    }
  }

  saveArticle() {
    this.articleService.create(this.articleForm.value).subscribe(result => {
      if (result) {
        return true;
      }
    });
  }

  update() {
    this.articleService.update(this.articleForm.value).subscribe(result => {
      if (result) {
        return true;
      }
    });
  }
}
