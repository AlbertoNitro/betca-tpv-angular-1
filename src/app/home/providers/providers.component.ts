import {Component} from '@angular/core';
import {Provider} from './provider.model';
import {User} from '../users/user.model';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html'
})
export class ProvidersComponent{
  static URL = 'providers';

  data: Provider[];
  title = 'Provider management';
  columns = ['company', 'nif'];

  constructor() { }

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
