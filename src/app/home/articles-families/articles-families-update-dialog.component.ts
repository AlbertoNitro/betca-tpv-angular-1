import {Component, Inject} from '@angular/core';
import {ArticleFamilyService} from './articles-families.service';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ArticleFamily} from './articles-families.model';
import {FamilyTypes} from './family-types.model';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {ArticlesFamiliesAttachDialogComponent} from './articles-families-attach-dialog.component';

@Component({
  selector: 'app-articles-families-update-dialog',
  templateUrl: './articles-families-update-dialog.component.html'
})
export class ArticlesFamiliesUpdateDialogComponent {
  data: ArticleFamily[];
  title = 'Family ' + this.parentFamily.description + ' has this components';
  columns = ['description', 'familyType'];
  familyTypes: FamilyTypes = new FamilyTypes();

  constructor(private articleFamilyService: ArticleFamilyService, @Inject(MAT_DIALOG_DATA) private parentFamily: ArticleFamilyMinimum,
              private dialog: MatDialog) {
    articleFamilyService.readAllComponentsInAFamily(parentFamily.description).subscribe(data => {
      this.data = data;
      this.changeFamilyTypeToLabel();
    });
  }

  private changeFamilyTypeToLabel() {
    for (const component of this.data) {
      switch (component.familyType) {
        case this.familyTypes.families[0].familyType: {
          component.familyType = this.familyTypes.families[0].label;
          break;
        }
        case this.familyTypes.families[1].familyType: {
          component.familyType = this.familyTypes.families[1].label;
          break;
        }
        case this.familyTypes.families[2].familyType: {
          component.familyType = this.familyTypes.families[2].label;
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  create() {
    this.dialog.open(ArticlesFamiliesAttachDialogComponent, {width: '30%', height: '50%', data: this.parentFamily}).afterClosed()
      .subscribe(() => {
        this.articleFamilyService.readAllComponentsInAFamily(this.parentFamily.description).subscribe(data => {
          this.data = data;
          this.changeFamilyTypeToLabel();
        });
      });
  }

  delete(articleFamily: ArticleFamily) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.articleFamilyService.deleteComponentFromFamily(this.parentFamily.description, articleFamily.description).subscribe(
            () => this.data = this.data.filter(item => item !== articleFamily)
          );
        }
      });

  }
}
