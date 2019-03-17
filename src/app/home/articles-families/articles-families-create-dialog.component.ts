import {Component} from '@angular/core';
import {ArticleFamilyService} from './articles-families.service';
import {ArticleFamily} from './articles-families.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-articles-families-create-dialog',
  templateUrl: './articles-families-create-dialog.component.html'
})
export class ArticlesFamiliesCreateDialogComponent {
  familyTypes = [{familyType: 'ARTICLE', label: 'Article'},
    {familyType: 'SIZES', label: 'Size'}, {familyType: 'ARTICLES', label: 'Family'}];
  familyTypeSelected: object;
  families: ArticleFamily[];
  familySelected: ArticleFamily;
  formCreateSize = new FormGroup({
    description: new FormControl('', [Validators.required])
  });
  formCreateFamily = new FormGroup({
    description: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required])
  });

  constructor(private articleFamilyService: ArticleFamilyService) {
    articleFamilyService.readAllFamilies().subscribe(data => this.families = data);
  }
}
