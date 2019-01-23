import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from './user.model';
import {HttpService} from '../../core/http.service';

@Injectable()
export class UserService {
  static END_POINT = '/users';

  constructor(private httpService: HttpService) {
  }

  sessionUsername(): Observable<User> {
    return this.httpService.get(UserService.END_POINT + '/' + this.httpService.getMobile());
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(UserService.END_POINT);
  }

}
