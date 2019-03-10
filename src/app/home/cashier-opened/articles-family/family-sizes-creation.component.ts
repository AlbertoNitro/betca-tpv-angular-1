import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-articles-family-creation',
  templateUrl: 'family-sizes-creation.component.html'
})
export class FamilySizesCreationComponent implements OnInit {
  private ALFASIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  public startSizesArray = [];
  public finalSizesArray = [];
  public articlesFamilySizesForm: FormGroup;
  public sizeTypeControl: FormControl;
  public stepControl: FormControl;
  public smallestSizeControl: FormControl;
  public largestSizeControl: FormControl;
  ngOnInit(): void {
    this.initForm();
    this.setDynamicFormControls();
    this.manageDynamicFormControlsValue();
  }

  private initForm() {
    this.articlesFamilySizesForm = new FormGroup({
      reference: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      provider: new FormControl('', Validators.required),
      sizeType: new FormControl('', Validators.required),
      step: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
      smallestSize: new FormControl({value: '', disabled: true}, Validators.required),
      largestSize: new FormControl({value: '', disabled: true}, Validators.required),
    });
  }
  private setDynamicFormControls() {
    this.stepControl = this.articlesFamilySizesForm.get('step') as FormControl;
    this.sizeTypeControl = this.articlesFamilySizesForm.get('sizeType') as FormControl;
    this.smallestSizeControl = this.articlesFamilySizesForm.get('smallestSize') as FormControl;
    this.largestSizeControl = this.articlesFamilySizesForm.get('largestSize') as FormControl;
  }
  private manageDynamicFormControlsValue() {
    this.sizeTypeControl.valueChanges.subscribe(val => {
      switch (val) {
        case 'numeric':
          this.setNumericStartSizesArray(this.stepControl.value);
          this.smallestSizeControl.reset({value: '', disabled: false});
          break;
        case 'alfa':
          this.setAlfaStartSizesArray();
          this.smallestSizeControl.reset({value: '', disabled: false});
          break;
        default:
          this.smallestSizeControl.reset({value: '', disabled: true});
      }
    });
    this.stepControl.valueChanges.subscribe(val => {
      this.setNumericStartSizesArray(val);
      this.smallestSizeControl.reset();
    });
    this.smallestSizeControl.valueChanges.subscribe(val => {
      if (!val || val === '') {
        this.largestSizeControl.reset({value: '', disabled: true});
      } else {
        switch (this.sizeTypeControl.value) {
          case 'numeric':
            this.finalSizesArray = this.startSizesArray.filter(el =>
              parseInt(el, 10) > parseInt(val, 10)
            );
            this.largestSizeControl.reset({value: '', disabled: false});
            break;
          case 'alfa':
            this.finalSizesArray = this.startSizesArray.filter(el =>
              this.ALFASIZES.indexOf(el) > this.ALFASIZES.indexOf(val)
            );
            this.largestSizeControl.reset({value: '', disabled: false});
            break;
          default:
            this.largestSizeControl.reset({value: '', disabled: true});
        }
      }
    });
  }
  private setNumericStartSizesArray(step) {
    this.startSizesArray = [];
    for (let i = 0; i <= 60; i += step) {
      this.startSizesArray.push(i.toString());
    }
  }
  private setAlfaStartSizesArray() {
    this.startSizesArray = this.ALFASIZES;
  }
  // TODO: API connection
  public createFamilySizes() {
    console.log('Form created! ', this.articlesFamilySizesForm.value);
  }
}
