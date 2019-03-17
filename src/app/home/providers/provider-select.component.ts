import {Component, EventEmitter, Output} from '@angular/core';
import {ProviderService} from './provider.service';
import {Provider} from './provider.model';

@Component({
  selector: 'app-provider-select',
  templateUrl: 'provider-select.component.html'
})
export class ProviderSelectComponent {

  providers: Provider[];
  @Output() change = new EventEmitter<string>();

  constructor(private providerService: ProviderService) {
    this.providerService.readAllActives().subscribe(
      data => this.providers = data
    );
  }

  onChange(selected) {
    this.change.emit(selected);
  }

}
