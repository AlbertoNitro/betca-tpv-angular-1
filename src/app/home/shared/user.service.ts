import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from './user.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class UserService {
  static END_POINT = '/users';

  constructor(private httpService: HttpService) {
  }


  loggedInUsername(): Observable<User> {
    return null; // this.httpService.authToken().get(TokensService.END_POINT + TokensService.USERNAME);
  }

}
