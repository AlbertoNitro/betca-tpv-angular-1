import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Provider} from './provider.model';
import {ProviderService} from './provider.service';

@Component({
  templateUrl: 'providers-save-dialog.component.html',
  styleUrls: ['../../core/dialog.component.css']

})
export class ProvidersSaveDialogComponent {

  mode: string;
  provider: Provider = {};

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private providerService: ProviderService){
    this.mode = data.mode;
    if (this.mode === 'update') {
      this.provider = data.provider;
    }
  }

  update() {
    this.providerService.update(this.provider).subscribe();
  }

  create() {
    alert(this.provider.company)
    this.providerService.create(this.provider).subscribe();
  }

  onclick() {
    if (this.mode === 'update') {
      this.update();
    } else if (this.mode === 'create') {
      this.create();
    }
  }
}
