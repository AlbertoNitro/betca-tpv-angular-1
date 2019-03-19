import { Component } from '@angular/core';
import { Offer } from './offer.model';
import { ArticleIdentificatorsMock } from './articleIdentificators.mock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {ArticleService} from '../shared/article.service';
import {Article} from '../shared/article.model';

@Component({
  selector: 'app-offers-create-dialog',
  templateUrl: './offers-create-dialog.component.html'
})
export class OffersCreateDialogComponent {
  title = 'Articles list';
  dataSource: MatTableDataSource<object>;
  displayedColumns = ['id', 'percentage', 'action'];
  offer: Offer;

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
    this.dataSource = new MatTableDataSource<object>();
  }

  addArticle(formAddArticle: FormGroup) {
    // TODO implement addArticle
    console.log('Add Article');
    const articleId = formAddArticle.controls.articleId.value;
    const percentage = formAddArticle.controls.percentage.value;
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

  createOffer(formCreateOffer: FormGroup) {
    // TODO implement createOffer
    this.offer.offername = formCreateOffer.controls.offername.value;
    this.offer.endDate = formCreateOffer.controls.endDate.value;
    console.log(this.dataSource.data, '<<<<<< dataSourceData');
    console.log(this.offer.articleLine, '<<<<<< ArticleLine');
    console.log(this.offer, '<<<<<<<< OFFER');
  }
}
