import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-articles-family-creation',
  templateUrl: 'articles-family-creation.component.html'
})
export class ArticlesFamilyCreationComponent implements OnInit {
  private ALFASIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  public sizesFromArray = [];
  public sizesToArray = [];
  public articlesFamilySizesForm: FormGroup;
  public sizeTypeControl: FormControl;
  public stepControl: FormControl;
  public fromControl: FormControl;
  public toControl: FormControl;
  ngOnInit(): void {
    this.initForm();
    this.setDynamicFormControls();
  }

  private initForm() {
    this.articlesFamilySizesForm = new FormGroup({
      reference: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      provider: new FormControl('', Validators.required),
      sizeType: new FormControl('', Validators.required),
      step: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
      sizeFrom: new FormControl({value: '', disabled: true}, Validators.required),
      sizeTo: new FormControl({value: '', disabled: true}, Validators.required),
    });
  }
  private setDynamicFormControls() {
    this.stepControl = this.articlesFamilySizesForm.get('step') as FormControl;
    this.sizeTypeControl = this.articlesFamilySizesForm.get('sizeType') as FormControl;
    this.fromControl = this.articlesFamilySizesForm.get('sizeFrom') as FormControl;
    this.toControl = this.articlesFamilySizesForm.get('sizeTo') as FormControl;
    this.manageDynamicFormControlsValue();
  }
  private manageDynamicFormControlsValue() {
    this.sizeTypeControl.valueChanges.subscribe(val => {
      switch (val) {
        case 'numeric':
          this.setNumFromArray(this.stepControl.value);
          this.fromControl.reset({value: '', disabled: false});
          break;
        case 'alfa':
          this.setAlfaFromArray();
          this.fromControl.reset({value: '', disabled: false});
          break;
        default:
          this.fromControl.reset({value: '', disabled: true});
      }
    });
    this.stepControl.valueChanges.subscribe(val => {
      this.setNumFromArray(val);
      this.fromControl.reset();
    });
    this.fromControl.valueChanges.subscribe(val => {
      if (!val || val === '') {
        this.toControl.reset({value: '', disabled: true});
      } else {
        switch (this.sizeTypeControl.value) {
          case 'numeric':
            this.sizesToArray = this.sizesFromArray.filter(el =>
              parseInt(el, 10) > parseInt(val, 10)
            );
            this.toControl.reset({value: '', disabled: false});
            break;
          case 'alfa':
            this.sizesToArray = this.sizesFromArray.filter(el =>
              this.ALFASIZES.indexOf(el) > this.ALFASIZES.indexOf(val)
            );
            this.toControl.reset({value: '', disabled: false});
            break;
          default:
            this.toControl.reset({value: '', disabled: true});
        }
      }
    });
  }
  private setNumFromArray(step) {
    this.sizesFromArray = [];
    for (let i = 0; i <= 60; i += step) {
      this.sizesFromArray.push(i.toString());
    }
  }
  private setAlfaFromArray() {
    this.sizesFromArray = this.ALFASIZES;
  }
  // TODO: API connection
  public create() {
    console.log('Form created! ', this.articlesFamilySizesForm.value);
  }
}
