import { Action, createReducer, on } from '@ngrx/store';
import * as NotesActions from '../actions/notes.actions';
import NoteState, { initializeState } from '../models/notes.state';
import Note from '../models/notes.model';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(NotesActions.BeginGetNotesAction, (state: NoteState) => {
    return { ...state, loading: true };
  }),
  on(NotesActions.SuccessGetNotesAction, (state: NoteState, { payload }) => {
    return { ...state, notes: payload, loading: false };
  }),
  on(NotesActions.ErrorNotesAction, (state: NoteState, error: Error) => {
    console.log(error);
    return { ...state, noteError: error, loading: false };
  }),
  on(NotesActions.CreateNoteAction, (state: NoteState, { payload }) => {
    return { ...state, NoteError: null };
  }),
  on(NotesActions.SuccessCreateNoteAction, (state: NoteState, { payload }) => {
    return { ...state, NoteError: null };
  }),
  on(NotesActions.SuccessNoteAddedAction, (state: NoteState, { payload }) => {
    return { ...state, notes: [...state.notes, payload], loading: false };
  }),
  on(NotesActions.FilterSystemNotesAction, (state: NoteState, { payload }) => {
    return {
      ...state,
      notes: payload
        ? state.notes.slice().filter((note) => note.userName !== 'system note')
        : state.notes,
    };
  })
);

export function notesReducer(state: NoteState | undefined, action: Action) {
  return reducer(state, action);
}
