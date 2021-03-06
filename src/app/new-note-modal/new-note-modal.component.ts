import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import NoteState from 'src/store/models/notes.state';
import * as NotesActions from '../../store/actions/notes.actions';

@Component({
  selector: 'app-new-note-modal',
  templateUrl: './new-note-modal.component.html',
  styleUrls: ['./new-note-modal.component.scss'],
})
export class NewNoteModalComponent implements OnInit {
  @Output() public closeModal: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  newNote: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15),
    ]),
    date: new FormControl(null),
  });

  constructor(private store: Store<{ notes: NoteState }>) {}

  ngOnInit(): void {}

  public checkError = (controlName: string, errorName: string) => {
    return this.newNote.controls[controlName].hasError(errorName);
  };

  public addNote() {
    this.closeModal.emit(true);
    this.store.dispatch(
      NotesActions.CreateNoteAction({
        payload: this.newNote.getRawValue(),
      })
    );
  }

  public dismissModal() {
    this.closeModal.emit(true);
  }
}
