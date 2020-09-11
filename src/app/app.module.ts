import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { MainContainerComponent } from './main-container/main-container/main-container.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { notesReducer } from '../classes/notes/notes.reducer';
import { NotesEffects } from '../classes/notes/notes.effects';
import { NoteListComponent } from './main-container/main-container/note-list/note-list.component';
import { NewNoteModalComponent } from './new-note-modal/new-note-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MainContainerComponent,
    NoteListComponent,
    NewNoteModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatProgressSpinnerModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,

    HttpClientModule,
    StoreModule.forRoot({ notes: notesReducer }),
    EffectsModule.forRoot([NotesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
