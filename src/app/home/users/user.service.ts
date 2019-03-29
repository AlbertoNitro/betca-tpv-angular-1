import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {User} from './user.model';
import {UserMinimum} from '../cashier-opened/shopping-cart/user-quick-creation-dialog/user-minimum.model';

import {UserRoles} from './user-roles.model';
import {UserSearch} from './user-search.model';
import {UserProfile} from './user-profile.model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(ApiEndpoint.USERS);
  }

  findByMobile(mobile: number): Observable<User> {
    return this.httpService.get(ApiEndpoint.USERS + '/' + mobile);
  }

  saveMinimumUser(user: UserMinimum): Observable<UserMinimum> {
    return this.httpService.post(ApiEndpoint.USERS + '/minimum', user);
  }

  saveUser(user: User): Observable<User> {
    return this.httpService.post(ApiEndpoint.USERS, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpService.put(ApiEndpoint.USERS + '/' + user.mobile, user);
  }

  updateRoles(user: UserRoles): Observable<User> {
    return this.httpService.put(ApiEndpoint.USERS + ApiEndpoint.ROLES + '/' + user.mobile, user );
  }
  readSearch(user: UserSearch): Observable<User[]> {
    return this.httpService.post(ApiEndpoint.USERS + ApiEndpoint.QUERY, user);
  }

  updateProfile(user: UserProfile): Observable<User> {
    return this.httpService.put(ApiEndpoint.USERS + ApiEndpoint.PASSWORDS + '/' + user.mobile, user );
  }


}
