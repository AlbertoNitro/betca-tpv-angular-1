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

  article: Article;

  title = 'Articles';
  columns = ['code', 'description', 'retail Price', 'stock'];
  data: Article[];

  createButton = false;
  editButton = false;
  deleteButton = false;

  dataSource: MatTableDataSource<Shopping>;
  private subscriptionDatasource: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.article = {code: null, description: null, retailPrice: null, stock: null};
    this.data = null;
    this.subscriptionDatasource = this.shoppingCartService.shoppingCartObservable().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Shopping>(data);
      }
    );
  }

  muestraDatos(datos: Article[]) {
    console.log(datos);
    this.data = datos;
    console.log(this.data);
    console.log('Datos en el advanced search: ');
  }

  add(article: Article) {
    this.shoppingCartService.add(this.data[this.data.indexOf(article)].code).subscribe(() => {
      },
      () => {
      }
    );
  }
}
