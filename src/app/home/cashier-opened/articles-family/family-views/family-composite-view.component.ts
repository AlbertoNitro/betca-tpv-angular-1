import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-family-composite-view',
  templateUrl: 'family-composite-view.component.html',
  styleUrls: ['../articles-family-view.component.css']
})

export class FamilyCompositeViewComponent {
  @Input() description: string;
  @Input() familyType: string;
}
