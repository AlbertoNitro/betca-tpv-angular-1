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

  familyCompositeRootList: FamilyCompositeMinimum[] = [];
  familyCompositeRootParam = 'root';

  constructor(private articlesFamilyViewService: ArticleFamilyViewService) {
    articlesFamilyViewService.readFamilyCompositeRoot(this.familyCompositeRootParam)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  expandElementsFamilyComposite() {
    console.log('show content family composite');
  }

}
