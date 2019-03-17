import { Component } from '@angular/core';
import { Offer } from './offer.model';
import { ArticleIdentificatorsMock } from './articleIdentificators.mock';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offers-create-dialog',
  templateUrl: './offers-create-dialog.component.html'
})
export class OffersCreateDialogComponent {
  title = 'Articles list';
  columns = ['id', 'percentage'];
  articleLine: object[] = [];
  offer: Offer;

  formCreateOffer = new FormGroup({
    offername: new FormControl('',
      [Validators.required]),
    endDate: new FormControl(  '',
      [Validators.required]),
  });

  constructor() {
    console.log(this.articleLine, '<<<<<< Init articleLine');
    /*this.articleLine = [
      { id: '1', percentage: 5 },
      { id: '2', percentage: 7 },
      { id: '3', percentage: 3 },
      { id: '4', percentage: 5 },
      { id: '5', percentage: 3 },
      { id: '6', percentage: 14 }
    ];*/
  }

  addArticle() {
    // TODO implement addArticle
    console.log('Add Article');
    console.log(this.articleLine, '<<<<<< BEFORE Add item to articleLine');
    const article: object = { id: '7', percentage: 3 };
    this.articleLine.push(article);
    console.log(this.articleLine, '<<<<<< AFTER Add item to articleLine');
  }

  delete(article: object) {
    // TODO implement deleteArticle in list
    console.log('Remove Article');
  }

  createOffer(formSubmited: FormGroup) {
    // TODO implement createOffer
    console.log('<<<<<<<< ENTRA >>>>>>>');
    console.log(this.articleLine, '<<<<<< Add item to articleLine');
    console.log(formSubmited, '<<<<<<<< FORM FIELDS');
  }
}
