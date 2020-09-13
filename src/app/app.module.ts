import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list/user-list.component';
import { MainContainerComponent } from './main-container/main-container/main-container.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { notesReducer } from '../store/reducers/notes.reducer';
import { NotesEffects } from '../store/effects/notes.effects';
import { NoteListComponent } from './main-container/main-container/note-list/note-list.component';
import { NewNoteModalComponent } from './new-note-modal/new-note-modal.component';
import { NoteFiltersComponent } from './main-container/main-container/note-filters/note-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MainContainerComponent,
    NoteListComponent,
    NewNoteModalComponent,
    NoteFiltersComponent,
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
    FormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,

    HttpClientModule,
    StoreModule.forRoot({
      notes: notesReducer,
    }),
    EffectsModule.forRoot([NotesEffects]),
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
