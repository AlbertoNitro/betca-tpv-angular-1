import {Component} from '@angular/core';
import {Provider} from './provider.model';
import {ProviderService} from './provider.service';
import {MatDialog} from '@angular/material';
import {DetailsDialogComponent} from '../../core/details-dialog.component';
import {ProvidersSaveDialogComponent} from './providers-save-dialog.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html'
})
export class ProvidersComponent{
  static URL = 'providers';

  data: Provider[] = [];
  title = 'Provider management';
  columns = ['company', 'nif'];
  provider: Provider = {'active' : true};

  constructor(private providerService: ProviderService, private dialog: MatDialog) {}

  create() {
        this.dialog.open(ProvidersSaveDialogComponent,
          {data: {
              mode: 'create'}
          }
        );
  }

  read(id: string) {
    this.providerService.read(id).subscribe(
      provider =>
        this.dialog.open(DetailsDialogComponent,
          {data: {
              title: 'Provider details',
              object: provider,
              properties: Object.getOwnPropertyNames(provider)}
          }
        )
    );
  }

  update(id: string) {
    this.providerService.read(id).subscribe(
      provider =>
        this.dialog.open(ProvidersSaveDialogComponent,
          {data: {
            mode: 'update',
            provider: provider}
          }
        )
    );
  }

  search() {
    this.providerService.search(this.provider).subscribe(
      providers => this.data = providers
    );
  }

  resetSearch() {
    this.provider = {'active' : true};
    this.data = [];
  }
}
