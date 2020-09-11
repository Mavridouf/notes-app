import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoteModalComponent } from './new-note-modal.component';

describe('NewNoteModalComponent', () => {
  let component: NewNoteModalComponent;
  let fixture: ComponentFixture<NewNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNoteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
