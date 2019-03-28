import {Component, Inject, OnInit} from '@angular/core';
import {Article} from '../../shared/article.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArticleService} from '../../shared/article.service';
import {GenericMatSelect} from '../../shared/generic-mat-select.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-article-create-update-dialog',
  templateUrl: './article-create-update-dialog.component.html',
  styleUrls: ['./article-create-update-dialog.component.css']
})

export class ArticleCreateUpdateDialogComponent implements OnInit {

  article: Article;
  articleForm: FormGroup;
  modeDialog: string;

  taxTypeList: GenericMatSelect[] = [
    {value: 'FREE', viewValue: 'Free'},
    {value: 'GENERAL', viewValue: 'General'},
    {value: 'REDUCED', viewValue: 'Reduced'},
    {value: 'SUPER_REDUCED', viewValue: 'Super Reduced'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private articleService: ArticleService,
              public dialogRef: MatDialogRef<ArticleCreateUpdateDialogComponent>) {
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

  create() {
    this.articleService.create(this.articleForm.value).subscribe(response => {
      this.dialogRef.close();
    });
  }

  update() {
    this.articleService.update(this.articleForm.value).subscribe(response => {
      this.dialogRef.close();
    });
  }
}
