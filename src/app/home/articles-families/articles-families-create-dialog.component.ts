import {Component} from '@angular/core';
import {ArticleFamilyService} from './articles-families.service';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleMinimum} from '../shared/article-minimum.model';
import {FamilyTypes} from './family-types.model';
import {FamilyType} from './family-type.model';
import {ArticleService} from '../shared/article.service';
import {ArticleFamily} from './articles-families.model';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-articles-families-create-dialog',
  templateUrl: './articles-families-create-dialog.component.html'
})
export class ArticlesFamiliesCreateDialogComponent {
  articlesMinimum: ArticleMinimum[];
  articleMinimumSelected: ArticleMinimum;
  families: ArticleFamilyMinimum[];
  familySelected: ArticleFamilyMinimum;
  familyToBeCreated: ArticleFamily = new ArticleFamily();
  familyTypes: FamilyTypes = new FamilyTypes();
  familyTypeSelected: FamilyType;
  formCreateSize = new FormGroup({
    description: new FormControl('', [Validators.required])
  });
  formCreateFamily = new FormGroup({
    description: new FormControl('', [Validators.required]),
    reference: new FormControl('', [Validators.required])
  });

  constructor(private articleFamilyService: ArticleFamilyService, private articleService: ArticleService, private snackbar: MatSnackBar,
              public dialogRef: MatDialogRef<ArticlesFamiliesCreateDialogComponent>) {
    articleFamilyService.readAllFamilies().subscribe(data => this.families = data);
  }

  isValid(): boolean {
    return this.familySelected != null && this.familyTypeSelected != null && (
      this.formCreateFamily.valid || this.formCreateSize.valid || this.articleMinimumSelected != null);
  }

  create() {
    switch (this.familyTypeSelected) {
      case this.familyTypes.families[2]: {
        this.familyToBeCreated = this.formCreateFamily.getRawValue();
        this.familyToBeCreated.familyType = this.familyTypeSelected.familyType;
        this.articleFamilyService.createFamilyComposite(this.familySelected.description, this.familyToBeCreated)
          .subscribe(data => this.snackbar.open('Family created with description of: ' + data.description,
            'Created', {duration: 4000}));
        this.dialogRef.close();
        break;
      }
      default: {
        break;
      }
    }
  }

  whenArticleSelected() {
    if (this.familyTypeSelected === this.familyTypes.families[0]) {
      this.articleService.readAllArticleMinimum().subscribe(data => this.articlesMinimum = data);
    }
  }
}
