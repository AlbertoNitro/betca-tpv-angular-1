import {Component} from '@angular/core';
import {Provider} from './provider.model';
import {User} from '../users/user.model';
import {ProviderService} from './provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html'
})
export class ProvidersComponent{
  static URL = 'providers';

  data: Provider[];
  title = 'Provider management';
  columns = ['company', 'nif'];

  constructor(private providerService: ProviderService) {
    this.providerService.readAll().subscribe(
      data => this.data = data
    );
  }

  create() {
    // TODO
  }

  read(user: User) {
    // TODO
  }

  update(user: User) {
    // TODO
  }
}
