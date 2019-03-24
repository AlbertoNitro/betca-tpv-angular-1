import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ArticleFamilyMinimum} from './articles-families-minimum.model';
import {ArticleFamilyService} from './articles-families.service';

@Component({
  selector: 'app-articles-families-attach-dialog',
  templateUrl: './articles-families-attach-dialog.component.html'
})
export class ArticlesFamiliesAttachDialogComponent {

  constructor(private articleFamilyService: ArticleFamilyService, @Inject(MAT_DIALOG_DATA) private parentFamily: ArticleFamilyMinimum) {
  }
}
