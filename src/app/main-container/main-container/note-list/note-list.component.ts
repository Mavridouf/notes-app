import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as NotesActions from '../../../../store/actions/notes.actions';
import Note from '../../../../store/models/notes.model';
import NoteState from '../../../../store/models/notes.state';
import { FiltersService } from 'src/services/filters/filters.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  @Input() public noteService: FiltersService;
  private notes$: Observable<NoteState>;
  private storeNotesSubscription: Subscription;
  private serviceNotesSubscription: Subscription;
  public noteList: Note[] = [];
  public loading: boolean = false;
  private noteError: Error = null;

  constructor(private store: Store<{ notes: NoteState }>) {
    this.notes$ = store.pipe(select('notes'));
  }

  ngOnInit() {
    this.storeNotesSubscription = this.notes$
      .pipe(
        map((noteState) => {
          if (noteState) {
            this.noteService.setNotes(
              noteState.notes.slice().sort((n1, n2) => {
                return (
                  new Date(n2.date).getTime() - new Date(n1.date).getTime()
                );
              })
            );
            this.noteError = noteState.noteError;
            this.loading = noteState.loading;
          }
        })
      )
      .subscribe();
    this.serviceNotesSubscription = this.noteService.filteredList$.subscribe(
      (notes) => (this.noteList = notes)
    );

    this.store.dispatch(NotesActions.BeginGetNotesAction());
  }

  ngOnDestroy() {
    if (this.storeNotesSubscription) {
      this.storeNotesSubscription.unsubscribe();
    }
    if (this.serviceNotesSubscription) {
      this.serviceNotesSubscription.unsubscribe();
    }
  }
}
