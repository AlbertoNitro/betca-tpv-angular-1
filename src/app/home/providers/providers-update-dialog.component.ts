import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Provider} from './provider.model';
import {ProviderService} from './provider.service';

@Component({
  templateUrl: 'providers-update-dialog.component.html',
  styleUrls: ['../../core/dialog.component.css']

})
export class ProvidersUpdateDialogComponent {

  provider: Provider;
  stringProperties: string[] = ['id', 'company', 'nif', 'email', 'address', 'phone', 'note'];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private providerService: ProviderService){
    this.provider = data.provider;
  }

  update() {
    this.providerService.update(this.provider).subscribe();
  }
}
