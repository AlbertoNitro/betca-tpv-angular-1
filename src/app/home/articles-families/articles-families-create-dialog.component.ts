import {Component} from '@angular/core';
import {ArticleFamilyService} from './articles-families.service';
import {ArticleFamily} from './articles-families.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleMinimum} from '../shared/article-minimum.model';
import {FamilyTypes} from './family-types.model';
import {FamilyType} from './family-type.model';

@Component({
  selector: 'app-articles-families-create-dialog',
  templateUrl: './articles-families-create-dialog.component.html'
})
export class ArticlesFamiliesCreateDialogComponent {
  articlesMinimum: ArticleMinimum[];
  familyTypes: FamilyTypes = new FamilyTypes();
  familyTypeSelected: FamilyType;
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

  isValid(): boolean {
    return this.familySelected != null && this.familyTypeSelected != null && (
      this.formCreateFamily.valid || this.formCreateSize.valid);
  }

  create() {
  }

  whenArticleSelected() {
    console.log(this.familyTypeSelected.familyType);
    /*if (this.familyTypeSelected === this.familyTypes[0]) {
      console.log('Articulo');
    }*/
  }
}
