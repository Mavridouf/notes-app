import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as NotesActions from '../../../../classes/notes/notes.actions';
import Note from '../../../../classes/notes/notes.model';
import NoteState from '../../../../classes/notes/notes.state';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  private notes$: Observable<NoteState>;
  private notesSubscription: Subscription;
  public noteList: Note[] = [];
  public loading: boolean = false;
  private noteError: Error = null;

  constructor(private store: Store<{ notes: NoteState }>) {
    this.notes$ = store.pipe(select('notes'));
  }

  ngOnInit() {
    this.notesSubscription = this.notes$
      .pipe(
        map((noteState) => {
          if (noteState) {
            this.noteList = noteState.notes;
            this.noteError = noteState.noteError;
            this.loading = noteState.loading;
          }
        })
      )
      .subscribe();

    this.store.dispatch(NotesActions.BeginGetNotesAction());
  }

  ngOnDestroy() {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }
}
