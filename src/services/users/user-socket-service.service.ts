import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { IUserResp } from 'src/store/models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserSocketServiceService {
  public liveConnectedUsers$ = this.socket.fromEvent<IUserResp>(
    'connected users'
  );
  constructor(private socket: Socket) {}
}
