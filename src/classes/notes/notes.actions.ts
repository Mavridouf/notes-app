import { createAction, props } from '@ngrx/store';
import Note from './notes.model';

export const BeginGetNotesAction = createAction('[Notes] - Begin Get Notes');

export const SuccessGetNotesAction = createAction(
  '[Notes] - Success Get Notes',
  props<{ payload: Note[] }>()
);

export const ErrorNotesAction = createAction('[Notes] - Error', props<Error>());
