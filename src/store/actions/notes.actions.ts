import { createAction, props } from '@ngrx/store';
import Note from '../models/notes.model';

export const BeginGetNotesAction = createAction('[Notes] - Begin Get Notes');

export const SuccessGetNotesAction = createAction(
  '[Notes] - Success Get Notes',
  props<{ payload: Note[] }>()
);

export const ErrorNotesAction = createAction('[Notes] - Error', props<Error>());

export const CreateNoteAction = createAction(
  '[Notes] - Create Note',
  props<{ payload: Note }>()
);

export const SuccessCreateNoteAction = createAction(
  '[Notes] - Success Create Note',
  props<{ payload: Note }>()
);

export const SuccessNoteAddedAction = createAction(
  '[Notes] - Success Added Note',
  props<{ payload: Note }>()
);

export const FilterSystemNotesAction = createAction(
  '[Notes] - Filter System',
  props<{ payload: boolean }>()
);
