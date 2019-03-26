import {Component} from '@angular/core';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})

export class ArticlesFamilyViewComponent {

  family_description = '';
  route_family_element = '';

  familyArticle() {
    console.log('content family article');
  }

  familyComposite() {
    console.log('content family composite');
  }

  familySize() {
    console.log('content family size');
  }
}
