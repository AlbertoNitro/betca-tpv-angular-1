import { Component } from '@angular/core';
import { Offer } from './offer.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-offers-create-dialog',
  templateUrl: './offers-create-dialog.component.html'
})
export class OffersCreateDialogComponent {
  title = 'Articles list';
  columns = ['Id', 'Percentage'];
  data: object[];
  offer: Offer;

  formCreateOffer = new FormGroup({
    offername: new FormControl('',
      []),
  });

  constructor() {
    this.data = [
      { 'Id': 1, 'Percentage': '5' },
      { 'Id': 2, 'Percentage': '7' },
      { 'Id': 3, 'Percentage': '3' },
      { 'Id': 4, 'Percentage': '5' },
      { 'Id': 5, 'Percentage': '3' },
      { 'Id': 6, 'Percentage': '14' },
      { 'Id': 7, 'Percentage': '31' },
    ];
  }

  addArticle() {
    // TODO implement addArticle
    console.log('Add Article');
  }

  delete() {
    // TODO implement deleteArticle in list
    console.log('Remove Article');
  }

  createOffer(formSubmited: FormGroup) {
    // TODO implement createOffer
    console.log('<<<<<<<< ENTRA >>>>>>>');
    console.log(formSubmited, '<<<<<<<< FORM FIELDS');
  }

  onSubmit(formSubmited: FormGroup) {
    console.log('<<<<<<<< ENTRA >>>>>>>');
    console.log(formSubmited, '<<<<<<<< FORM FIELDS');
  }

}
