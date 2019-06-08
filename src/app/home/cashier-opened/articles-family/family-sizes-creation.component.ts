import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '../../shared/article.service';

@Component({
  selector: 'app-articles-family-creation',
  templateUrl: 'family-sizes-creation.component.html'
})
export class FamilySizesCreationComponent implements OnInit {
  private ALFASIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  public startSizesArray = [];
  public finalSizesArray = [];
  public familySizesForm: FormGroup;
  public sizesArrayDefinitionForm: FormGroup;
  public sizeTypeControl: FormControl;
  public stepControl: FormControl;
  public smallestSizeControl: FormControl;
  public largestSizeControl: FormControl;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.initFamilySizesForm();
    this.initSizesArrayDefinitionForm();
    this.setDynamicFormControls();
  }

  private initFamilySizesForm() {
    this.familySizesForm = new FormGroup({
      reference: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      provider: new FormControl('', Validators.required),
      sizesArray: new FormControl([])
    });
  }

  private initSizesArrayDefinitionForm() {
    this.sizesArrayDefinitionForm = new FormGroup({
      sizeType: new FormControl('', Validators.required),
      step: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10)]),
      smallestSize: new FormControl({value: '', disabled: true}, Validators.required),
      largestSize: new FormControl({value: '', disabled: true}, Validators.required),
    });
  }

  private setDynamicFormControls() {
    this.sizeTypeControl = this.sizesArrayDefinitionForm.get('sizeType') as FormControl;
    this.stepControl = this.sizesArrayDefinitionForm.get('step') as FormControl;
    this.smallestSizeControl = this.sizesArrayDefinitionForm.get('smallestSize') as FormControl;
    this.largestSizeControl = this.sizesArrayDefinitionForm.get('largestSize') as FormControl;
    this.manageSizeTypeControlValue();
    this.manageStepControlValue();
    this.manageSmallestSizeControlValue();
  }

  private manageSizeTypeControlValue() {
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
  }

  private manageStepControlValue() {
    this.stepControl.valueChanges.subscribe(val => {
      if (val < 1) {
        this.stepControl.setValue(1);
      } else if (val > 10) { this.stepControl.setValue(10);
      } else {
        this.setNumericStartSizesArray(val);
        this.smallestSizeControl.reset();
      }
    });
  }

  private manageSmallestSizeControlValue() {
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

  private defineSizesArray() {
    const firstSize = this.startSizesArray.indexOf(this.smallestSizeControl.value);
    const lastSize = this.startSizesArray.indexOf(this.largestSizeControl.value) + 1;
    return this.startSizesArray.slice(firstSize, lastSize);
  }

  public createFamilySizes() {
    this.familySizesForm.controls.sizesArray.setValue(this.defineSizesArray());
    this.articleService.createFamilySizes(this.familySizesForm).subscribe(
      response => {
        console.log('Response -> ', response);
      },
      err => {
        console.log('Err -> ', err);
      });
  }
}
