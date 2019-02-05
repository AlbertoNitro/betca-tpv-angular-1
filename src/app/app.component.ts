import {Component} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version: string = environment.VERSION;
  apiEndPoint: string = environment.API;
  profile: string;

  constructor() {
    this.profile = environment.production ? 'Production' : 'Develop';
  }
}
