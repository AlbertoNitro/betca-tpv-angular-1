import {Component} from '@angular/core';
import {ArticleFamilyViewService} from './articles-families-view.service';
import {FamilyCompositeMinimum} from './family-composite-minimum.model';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})

export class ArticlesFamilyViewComponent {

  familyCompositeRoot: FamilyCompositeMinimum;

  familyCompositeRootArticleList = [];
  familyCompositeRootArticlesList = [];
  familyCompositeRootSizesList = [];

  constructor(private articlesFamilyViewService: ArticleFamilyViewService) {
    articlesFamilyViewService.readFamilyCompositeRoot()
      .subscribe(
        (data) => {
          this.familyCompositeRoot = data;

          data.familyCompositeList.forEach(
            elm => {
              if ( elm.familyType === 'ARTICLE') {
                this.familyCompositeRootArticleList.push(elm);
              } else if (elm.familyType === 'ARTICLES') {
                this.familyCompositeRootArticlesList.push(elm);
              } else {
                this.familyCompositeRootSizesList.push(elm);
              }
            }
          );
          console.log(data);
          console.log(this.familyCompositeRootArticleList);
          console.log(this.familyCompositeRootArticlesList);
        }
      );
  }

  expandElementsFamilyComposite() {
    console.log('show content family composite');
  }

}
