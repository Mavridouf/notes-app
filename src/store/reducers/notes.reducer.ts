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
  on(NotesActions.CreateNoteAction, (state: NoteState, note: Note) => {
    return { ...state, ToDos: [...state.notes, note], ToDoError: null };
  }),
  on(NotesActions.SuccessCreateNoteAction, (state: NoteState, { payload }) => {
    return { ...state, ToDos: [...state.notes, payload], ToDoError: null };
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
