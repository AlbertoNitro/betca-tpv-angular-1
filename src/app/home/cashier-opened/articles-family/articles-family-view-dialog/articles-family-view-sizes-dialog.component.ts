import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ArticleFamilyViewElement} from '../article-family-view-element.model';
import {ShoppingCartService} from '../../shopping-cart/shopping-cart.service';


@Component({
  templateUrl: 'articles-family-view-sizes-dialog.component.html',
  styleUrls: ['articles-family-view-sizes-dialog.component.css']
})
export class ArticlesFamilyViewSizesDialogComponent {

  articlesSizeslist: ArticleFamilyViewElement[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private shoppingCartService: ShoppingCartService,
    private dialog: MatDialog, public dialogRef: MatDialogRef<ArticlesFamilyViewSizesDialogComponent>) {
    this.articlesSizeslist = data;
  }

  addSizeToCart(code: string) {
    return this.shoppingCartService.add(code).subscribe(data => {}, () => {},
      () => {
        this.dialogRef.close();
      }
    );
  }
}
