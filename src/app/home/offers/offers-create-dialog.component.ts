import {Component, OnInit} from '@angular/core';
import {ArticleLine, CreateOffer} from './offer.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {ArticleService} from '../shared/article.service';
import {OfferService} from './offer.service';

@Component({
  selector: 'app-offers-create-dialog',
  templateUrl: './offers-create-dialog.component.html'
})
export class OffersCreateDialogComponent implements OnInit {
  title = 'Articles list';
  dataSource: MatTableDataSource<ArticleLine>;
  displayedColumns = ['id', 'percentage', 'action'];
  offer: CreateOffer;

  public formCreateOffer: FormGroup;
  public formAddArticle: FormGroup;

  ngOnInit() {
    this.formCreateOffer = new FormGroup({
      offername: new FormControl('',
        [Validators.required]),
      endDate: new FormControl(  '',
        [Validators.required]),
    });

    this.formAddArticle = new FormGroup({
      articleId: new FormControl('',
        [Validators.required]),
      percentage: new FormControl(  '',
        [Validators.required, Validators.min(1), Validators.max(100)] ),
    });
  }

  constructor(private offerService: OfferService, private articleService: ArticleService) {
    this.dataSource = new MatTableDataSource<ArticleLine>();
  }

  addArticle(formSubmitted: FormGroup) {
    const articleId = formSubmitted.controls.articleId.value;
    const percentage = formSubmitted.controls.percentage.value;
    this.articleService.readOne(articleId).subscribe((result) => {
        const articleRepeated = this.dataSource.data.find(article => article.id === articleId) !== undefined;
        if (!articleRepeated) {
          this.dataSource.data.push({ id: articleId, percentage: percentage });
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
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
    this.offer = {
      offername: formSubmitted.controls.offername.value,
      endDate: formSubmitted.controls.endDate.value,
      articleLine: this.dataSource.data
    };
    this.offerService.create(this.offer).subscribe();
  }
}
