import {Component, Inject} from '@angular/core';
import {ArticleFamilyService} from './articles-families.service';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-articles-families-update-dialog',
  templateUrl: './articles-families-update-dialog.component.html'
})
export class ArticlesFamiliesUpdateDialogComponent {
  data: ArticleFamilyMinimum[];
  title = 'Family ' + this.parentFamily.description + ' has this components';
  columns = ['description'];

  constructor(private articleFamilyService: ArticleFamilyService, @Inject(MAT_DIALOG_DATA) private parentFamily: ArticleFamilyMinimum) {
    articleFamilyService.readAllFamilies().subscribe(data => this.data = data);
  }

  create() {

  }

  delete($event: any) {
  }
}
