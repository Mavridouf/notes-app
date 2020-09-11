import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as NotesActions from './notes.actions';
import Note, { INodeResp } from './notes.model';

@Injectable()
export class NotesEffects {
  constructor(private http: HttpClient, private action$: Actions) {}

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
}
