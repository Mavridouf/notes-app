import Note from './notes.model';

export default class NoteState {
  notes: Note[];
  noteError: Error;
  loading: boolean;
}

export const initializeState = (): NoteState => {
  return { notes: [], noteError: null, loading: false };
};
