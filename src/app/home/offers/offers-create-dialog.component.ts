import { Component } from '@angular/core';
import {ArticleLine, CreateOffer} from './offer.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {ArticleService} from '../shared/article.service';

@Component({
  selector: 'app-offers-create-dialog',
  templateUrl: './offers-create-dialog.component.html'
})
export class OffersCreateDialogComponent {
  title = 'Articles list';
  dataSource: MatTableDataSource<ArticleLine>;
  displayedColumns = ['id', 'percentage', 'action'];
  offer: CreateOffer;

  formCreateOffer = new FormGroup({
    offername: new FormControl('',
      [Validators.required]),
    endDate: new FormControl(  '',
      [Validators.required]),
  });

  formAddArticle = new FormGroup({
    articleId: new FormControl('',
      [Validators.required]),
    percentage: new FormControl(  '',
      [Validators.required]),
  });

  constructor(private articleService: ArticleService) {
    this.dataSource = new MatTableDataSource<ArticleLine>();
  }

  addArticle(formSubmitted: FormGroup) {
    // TODO implement addArticle
    console.log('Add Article');
    const articleId = formSubmitted.controls.articleId.value;
    const percentage = formSubmitted.controls.percentage.value;
    this.articleService.readOne(articleId).subscribe((result) => {
        console.log(result, '<<<<<<<<< ARTICLE FOUNDED');
        this.dataSource.data.push({ id: articleId, percentage: percentage });
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      },
      (error) => {
        console.log(error, '<<<<<<<<< ERROR: Article Id not found');
      }
    );
  }

  delete(article: object) {
    this.dataSource.data = this.dataSource.data.filter(h => h !== article);
  }

  createOffer(formSubmitted: FormGroup) {
    // TODO implement createOffer
    console.log(formSubmitted.controls.offername.value, '<<<<<< offername - FORM CREATE OFFER CONTROLS');
    console.log(formSubmitted.controls.endDate.value, '<<<<<< endDate - FORM CREATE OFFER CONTROLS');
    console.log(this.offer, '<<<<<<<< OFFER');
    console.log(this.dataSource.data, '<<<<<< dataSourceData');
    this.offer = {
      offername: formSubmitted.controls.offername.value,
      endDate: formSubmitted.controls.endDate.value,
      articleLine: undefined
    };
    this.offer.articleLine = this.dataSource.data;
    console.log(this.offer, '<<<<<<<< OFFER');
  }
}
