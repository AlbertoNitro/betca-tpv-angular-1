import {Component} from '@angular/core';
import {ArticleQueryModel} from '../../shared/article-query.model';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';
import {MatTableDataSource} from '@angular/material';
import {Shopping} from '../shopping-cart/shopping.model';
import {Subscription} from 'rxjs';
import {Article} from '../../shared/article.model';

@Component({
  selector: 'app-advanced-search',
  templateUrl: 'advanced-search.component.html'
})
export class AdvancedSearchComponent {

  article: ArticleQueryModel;

  title = 'Articles';
  columns = ['code', 'description', 'retailPrice', 'stock'];
  data: Article[];

  dataSource: MatTableDataSource<Shopping>;
  private subscriptionDatasource: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.article = {description: null, stock: null, maxPrice: null, minPrice: null};
    this.data = null;
    this.subscriptionDatasource = this.shoppingCartService.shoppingCartObservable().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Shopping>(data);
      }
    );
  }

  updateData(data) {
    console.log(data);
    this.data = data;
  }

  add(article: Article) {
    this.shoppingCartService.add(this.data[this.data.indexOf(article)].code).subscribe(() => {
      },
      () => {
      }
    );
  }
}
