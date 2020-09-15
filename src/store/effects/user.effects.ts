import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as UsersActions from '../actions/users.actions';
import { UserSocketServiceService } from 'src/services/users/user-socket-service.service';
import { IUserResp } from '../models/users.model';

@Injectable()
export class UsersEffects {
  @Effect()
  liveUsersUpdated$ = this.userSocketService.liveConnectedUsers$.pipe(
    map((data: IUserResp) => {
      return UsersActions.SuccessGetUsersAction({ payload: data.users });
    })
  );

  constructor(private userSocketService: UserSocketServiceService) {}
}
