import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ArticleSize} from './article-size-view.model';


@Component({
  templateUrl: 'articles-family-view-sizes-dialog.component.html',
  styleUrls: ['articles-family-view-sizes-dialog.component.css']
})
export class ArticlesFamilyViewSizesDialogComponent {

  articlesSizeslist: ArticleSize[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.articlesSizeslist = data;
  }

  addSizeToCart(reference: string) {
    console.log('add to cart');
  }
}
