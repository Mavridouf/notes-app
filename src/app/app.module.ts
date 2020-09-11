import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { MainContainerComponent } from './main-container/main-container/main-container.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { notesReducer } from '../classes/notes/notes.reducer';
import { NotesEffects } from '../classes/notes/notes.effects';
import { NoteListComponent } from './main-container/main-container/note-list/note-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MainContainerComponent,
    NoteListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    HttpClientModule,
    StoreModule.forRoot({ notes: notesReducer }),
    EffectsModule.forRoot([NotesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
