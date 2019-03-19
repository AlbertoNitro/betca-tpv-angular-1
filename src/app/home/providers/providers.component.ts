import {Component} from '@angular/core';
import {Provider} from './provider.model';
import {User} from '../users/user.model';
import {ProviderService} from './provider.service';
import {MatDialog} from '@angular/material';
import {DetailsDialogComponent} from '../../core/details-dialog.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html'
})
export class ProvidersComponent{
  static URL = 'providers';

  data: Provider[];
  title = 'Provider management';
  columns = ['company', 'nif'];

  constructor(private providerService: ProviderService, private dialog: MatDialog) {
    this.providerService.readAll().subscribe(
      data => this.data = data
    );
  }

  create() {
    // TODO
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

  update(user: User) {
    // TODO
  }
}
