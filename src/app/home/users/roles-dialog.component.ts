import {Component, OnInit} from '@angular/core';
import {TokensService} from '../../core/tokens.service';

@Component({
  selector: 'app-perfile',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./users.component.css']
})
export class RolesDialogComponent implements OnInit {
  adminIs = true;
  operatorIs = false;
  constructor(private tokensService: TokensService) { }

  ngOnInit() {
    if (this.tokensService.isAdmin()) {
      this.operatorIs = false;
      console.log('admin');
    } else if (this.tokensService.isManager()) {
      this.adminIs = false;
      console.log('"manager');
    } else {
      console.log('operator');
      this.operatorIs = true;
    }
  }
  guardar() {
  }
}
