import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-family-article-view',
  templateUrl: 'family-article-view.component.html',
  styleUrls: ['../articles-family-view.component.css']
})

export class FamilyArticleViewComponent {
  @Input() code: string;
  @Input() description: string;
  @Input() retailPrice: string;
  @Input() familyType: string;
}
