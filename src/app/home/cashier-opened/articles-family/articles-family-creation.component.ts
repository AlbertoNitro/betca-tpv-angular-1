import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-articles-family-creation',
  templateUrl: 'articles-family-creation.component.html'
})
export class ArticlesFamilyCreationComponent implements OnInit {
  public ALFASIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  public sizesFromArray = [];
  public sizesToArray = [];
  public articlesFamilySizesForm: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.articlesFamilySizesForm = new FormGroup({
      reference: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      provider: new FormControl('', Validators.required),
      sizeType: new FormControl('', Validators.required),
      step: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
      sizeFrom: new FormControl('', Validators.required),
      sizeTo: new FormControl('', Validators.required),
    });
    this.articlesFamilySizesForm.get('step').valueChanges.subscribe(val =>
      this.setSizesFromArray(val)
    );
    this.articlesFamilySizesForm.get('sizeType').valueChanges.subscribe(val => {
        val === 'numeric' ? this.setSizesFromArray(this.articlesFamilySizesForm.value.step) : this.sizesFromArray = this.ALFASIZES;
        this.articlesFamilySizesForm.value.sizeFrom = this.articlesFamilySizesForm.value.sizeTo = '';
    });
    // TODO: This is not working on alfa types
    this.articlesFamilySizesForm.get('sizeFrom').valueChanges.subscribe(val =>
      this.sizesToArray = this.sizesFromArray.filter(el => parseInt(el, 10) > parseInt(val, 10))
    );
  }
  public setSizesFromArray(step) {
    this.sizesFromArray = [];
    for (let i = 1; i <= 60; i += step) {
      this.sizesFromArray.push(i.toString());
    }
  }
  // TODO: API connection
  public create() {
    console.log('Form created! ', this.articlesFamilySizesForm.value);
  }
}
