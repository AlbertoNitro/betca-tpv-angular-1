import {Component} from '@angular/core';
import {ArticleFamilyService} from '../shared/articles-families.service';
import {ArticleFamilyMinimum} from '../shared/articles-families-minimum.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleMinimum} from '../../shared/article-minimum.model';
import {FamilyTypes} from '../shared/family-types.model';
import {FamilyType} from '../shared/family-type.model';
import {ArticleService} from '../../shared/article.service';
import {ArticleFamily} from '../shared/articles-families.model';
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
  familyCompositeToBeCreated: ArticleFamily = new ArticleFamily();
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
    articleFamilyService.readAllFamilyComposites(this.familyTypes.families[2].familyType).subscribe(data => this.families = data);
  }

  create() {
    switch (this.familyTypeSelected) {
      case this.familyTypes.families[0]: {
        this.articleFamilyService.attachToFamily(this.familySelected.description, new ArticleFamily()
          .setArticleMinimum(this.articleMinimumSelected)).subscribe(data =>
          this.snackbar.open('Article attached with description of: ' + data.description, 'Created', {duration: 4000}));
        this.dialogRef.close();
        break;
      }
      case this.familyTypes.families[1]: {
        this.createFamilyComposite('Size', this.formCreateSize);
        break;
      }
      case this.familyTypes.families[2]: {
        this.createFamilyComposite('Family', this.formCreateFamily);
        break;
      }
      default: {
        break;
      }
    }
  }

  private createFamilyComposite(type: string, form: FormGroup) {
    this.familyCompositeToBeCreated = form.getRawValue();
    this.familyCompositeToBeCreated.familyType = this.familyTypeSelected.familyType;
    this.articleFamilyService.createFamilyComposite(this.familySelected.description, this.familyCompositeToBeCreated)
      .subscribe(data => this.snackbar.open(type + ' created with description of: ' + data.description,
        'Created', {duration: 4000}));
    this.dialogRef.close();
  }

  isValid(): boolean {
    return this.familySelected != null && this.familyTypeSelected != null && (
      this.formCreateFamily.valid || this.formCreateSize.valid || this.articleMinimumSelected != null);
  }

  whenArticleSelected() {
    if (this.familyTypeSelected === this.familyTypes.families[0]) {
      this.articleService.readAllArticleMinimum().subscribe(data => this.articlesMinimum = data);
    }
  }
}
