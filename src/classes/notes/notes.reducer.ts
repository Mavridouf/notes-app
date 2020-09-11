import { Action, createReducer, on } from '@ngrx/store';
import * as NotesActions from './notes.actions';
import NoteState, { initializeState } from './notes.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(NotesActions.BeginGetNotesAction, (state: NoteState) => {
    return { ...state, loading: true };
  }),
  on(NotesActions.SuccessGetNotesAction, (state: NoteState, { payload }) => {
    return { ...state, notes: payload, loading: false };
  }),
  on(NotesActions.ErrorNotesAction, (state: NoteState, error: Error) => {
    console.log(error);
    return { ...state, noteError: error, loading: false };
  })
);

export function notesReducer(state: NoteState | undefined, action: Action) {
  return reducer(state, action);
}
