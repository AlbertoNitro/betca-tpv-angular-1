import {Injectable} from '@angular/core';

import {HttpService} from '../../core/http.service';

@Injectable()
export class AdminsService {
  static END_POINT = '/admins';
  static DB = '/db';


  constructor(private httpService: HttpService) {
  }

  deleteDb(): void {
    this.httpService.bearerAuth().successful().delete(AdminsService.END_POINT + AdminsService.DB).subscribe(
      () => {
      }
    );
  }

  seedDb(ymlFileName: string): void {
    this.httpService.bearerAuth().successful().post(AdminsService.END_POINT + AdminsService.DB, ymlFileName).subscribe(
      () => {
      }
    );
  }

}
