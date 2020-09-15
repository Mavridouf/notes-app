import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as NotesActions from '../actions/notes.actions';
import Note, { INodeResp } from '../models/notes.model';
import { NotesSocketServiceService } from 'src/services/notes/notes-socket-service.service';

@Injectable()
export class NotesEffects {
  private ApiURL: string = 'http://localhost:3000/api/notes';

  getNotes$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(NotesActions.BeginGetNotesAction),
      mergeMap((action) =>
        this.http.get(this.ApiURL).pipe(
          map((data: INodeResp) => {
            return NotesActions.SuccessGetNotesAction({ payload: data.notes });
          }),
          catchError((error: Error) => {
            return of(NotesActions.ErrorNotesAction(error));
          })
        )
      )
    )
  );

  createNotes$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(NotesActions.CreateNoteAction),
      mergeMap((action) =>
        this.http
          .post(this.ApiURL, JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' },
          })
          .pipe(
            map((data: Note) => {
              return NotesActions.SuccessCreateNoteAction({ payload: data });
            }),
            catchError((error: Error) => {
              return of(NotesActions.ErrorNotesAction(error));
            })
          )
      )
    )
  );

  @Effect()
  liveNoteCreate$ = this.noteSocketService.liveNoteCreated$.pipe(
    map((data: INodeResp) => {
      return NotesActions.SuccessNoteAddedAction({ payload: data.notes[0] });
    })
  );

  constructor(
    private http: HttpClient,
    private action$: Actions,
    private noteSocketService: NotesSocketServiceService
  ) {}
}
