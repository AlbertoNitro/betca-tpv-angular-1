import { Component } from '@angular/core';
import { Offer } from './offer.model';
import { ArticleIdentificatorsMock } from './articleIdentificators.mock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {ShoppingCart} from '../tickets/tickets.component';

@Component({
  selector: 'app-offers-create-dialog',
  templateUrl: './offers-create-dialog.component.html'
})
export class OffersCreateDialogComponent {
  title = 'Articles list';
  // columns = ['id', 'percentage'];
  dataSource: MatTableDataSource<object>;
  displayedColumns = ['id', 'percentage', 'action'];
  offer: Offer;

  formCreateOffer = new FormGroup({
    offername: new FormControl('',
      [Validators.required]),
    endDate: new FormControl(  '',
      [Validators.required]),
  });

  constructor() {
    console.log(this.dataSource.data, '<<<<<< Init articleLine');
    this.dataSource = new MatTableDataSource<object>();
  }

  addArticle() {
    // TODO implement addArticle
    console.log('Add Article');
    const article: object = { id: '7', percentage: 3 }; // TODO Replace this hardcore data for data inputs
    this.dataSource.data.push(article);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  delete(article: object) {
    // TODO implement deleteArticle in list
    console.log('Remove Article');
    console.log(article, '<<<<<< Removed article');
  }

  createOffer(formSubmited: FormGroup) {
    // TODO implement createOffer
    console.log('<<<<<<<< ENTRA >>>>>>>');
    console.log(this.dataSource.data, '<<<<<< ArticleLine');
    console.log(formSubmited, '<<<<<<<< FORM FIELDS');
  }
}
