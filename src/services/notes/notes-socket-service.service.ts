import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { INodeResp } from 'src/store/models/notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesSocketServiceService {
  public liveNoteCreated$ = this.socket.fromEvent<INodeResp>('new note');
  constructor(private socket: Socket) {}
}
