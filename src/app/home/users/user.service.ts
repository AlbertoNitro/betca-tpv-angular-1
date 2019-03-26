import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {User} from './user.model';
import {UserMinimum} from './user-quick-creation-dialog/user-minimum.model';
import {Provider} from '../providers/provider.model';
import {UserRolesModel} from './user-roles.model';

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

  saveUser(user: UserMinimum): Observable<UserMinimum> {
    return this.httpService.post(ApiEndpoint.USERS, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpService.put(ApiEndpoint.USERS, user);
  }
  updateRoles(user: UserRolesModel): Observable<UserRolesModel> {
    console.log(ApiEndpoint.USERS + ApiEndpoint.ROLES + '/' + user.mobile);
    return this.httpService.put(ApiEndpoint.USERS + ApiEndpoint.ROLES + '/' + user.mobile, user );
  }


}
