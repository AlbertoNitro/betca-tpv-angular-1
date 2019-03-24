import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {ArticleFamilyService} from './articles-families.service';
import {FamilyTypes} from './family-types.model';
import {FamilyType} from './family-type.model';
import {ArticleMinimum} from '../shared/article-minimum.model';
import {ArticleService} from '../shared/article.service';
import {ArticleFamily} from './articles-families.model';

@Component({
  selector: 'app-articles-families-attach-dialog',
  templateUrl: './articles-families-attach-dialog.component.html'
})
export class ArticlesFamiliesAttachDialogComponent {
  articlesFamily: ArticleFamilyMinimum[];
  articleFamilySelected: ArticleFamilyMinimum;
  articlesMinimum: ArticleMinimum[];
  articleMinimumSelected: ArticleMinimum;
  familyTypes: FamilyTypes = new FamilyTypes();
  familyTypeSelected: FamilyType;

  constructor(private articleFamilyService: ArticleFamilyService, @Inject(MAT_DIALOG_DATA) private parentFamily: ArticleFamilyMinimum,
              private articleService: ArticleService, public dialogRef: MatDialogRef<ArticlesFamiliesAttachDialogComponent>) {
  }

  create() {
    if (this.familyTypeSelected === this.familyTypes.families[0]) {
      this.articleFamilyService.attachToFamily(this.parentFamily.description,
        new ArticleFamily().setArticleMinimum(this.articleMinimumSelected)).subscribe(() => this.dialogRef.close());
    } else {
      this.articleFamilyService.attachToFamily(this.parentFamily.description,
        new ArticleFamily().setArticleFamilyMinimum(this.articleFamilySelected)).subscribe(() => this.dialogRef.close());
    }
  }

  isValid() {
    return this.familyTypeSelected != null && (this.articleFamilySelected != null || this.articleMinimumSelected != null);
  }

  whenSelected() {
    if (this.familyTypeSelected === this.familyTypes.families[0]) {
      this.articleService.readAllArticleMinimum().subscribe(data => this.articlesMinimum = data);
    } else {
      this.articleFamilyService.readAllFamilyComposites(this.familyTypeSelected.familyType).subscribe(data => this.articlesFamily = data);
    }
  }
}
