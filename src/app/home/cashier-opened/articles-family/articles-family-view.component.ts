import {Component} from '@angular/core';
import {ArticleFamilyViewService} from './articles-families-view.service';
import {ArticleFamilyViewElement} from './article-family-view-element.model';
import {ArticlesFamilyViewSizesDialogComponent} from './articles-family-view-dialog/articles-family-view-sizes-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})

export class ArticlesFamilyViewComponent {

  articlesFamilyList: ArticleFamilyViewElement[] = [];
  ArticlesFamilyViewDefaultComposite = 'root';

  familyTypes: string[] = [];

  constructor(private articlesFamilyViewService: ArticleFamilyViewService, private dialog: MatDialog) {
    this.familyTypes.push(this.ArticlesFamilyViewDefaultComposite);
    this.articlesFamilyViewService.readFamilyCompositeRoot(this.ArticlesFamilyViewDefaultComposite)
      .subscribe(
        data => {
          this.articlesFamilyList = data;
          console.log(data);
        }
      );
  }

  showSizes() {
    this.dialog.open(ArticlesFamilyViewSizesDialogComponent);
  }

  addArticleFromSize(code: number) {
    console.log('my code + ' + code);
  }


  readFamilyArticlesList(description: string) {
    this.familyTypes.push(description);
    console.log(description);
    this.articlesFamilyViewService.readFamilyCompositeRoot(description)
      .subscribe(
        data => {
          this.articlesFamilyList = data;
          console.log(data);
        }
      );
  }

  readFamilySizesList(reference: string) {
    console.log('look for all articles sizes + my ref: ' + reference);
  }


  handleFamilyTypeArticlesFamily(familyType: string, articleItem: ArticleFamilyViewElement) {
    let itemProperty;
    switch (familyType) {
      case 'ARTICLE': {
        itemProperty = articleItem.code;
        console.log('add this article to shopping cart');
        break;
      }
      case 'ARTICLES': {
        this.readFamilyArticlesList(articleItem.description);
        break;
      }
      case 'SIZES': {
        console.log('look all sizes for this article');
        break;
      }
      default: {
        console.log('No family type obtained');
        break;
      }
    }

  }

}
