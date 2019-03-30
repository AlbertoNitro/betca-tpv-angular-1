import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ArticleFamilyViewElement} from '../article-family-view-element.model';


@Component({
  templateUrl: 'articles-family-view-sizes-dialog.component.html',
  styleUrls: ['articles-family-view-sizes-dialog.component.css']
})
export class ArticlesFamilyViewSizesDialogComponent {

  articlesSizeslist: ArticleFamilyViewElement[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[], private dialog: MatDialog, public dialogRef: MatDialogRef<ArticlesFamilyViewSizesDialogComponent>) {
    console.log('IN DIALOG' + data);
    data.forEach(
      e => console.log(e)
    );
    this.articlesSizeslist = data;
  }

  addSizeToCart(reference: string) {
    console.log('add to cart');
  }
}
