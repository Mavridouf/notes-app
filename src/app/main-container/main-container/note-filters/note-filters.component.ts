import { Component, OnInit, Input } from '@angular/core';
import { FiltersService, TextFilterType } from 'src/services/filters.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-note-filters',
  templateUrl: './note-filters.component.html',
  styleUrls: ['./note-filters.component.css'],
})
export class NoteFiltersComponent implements OnInit {
  @Input() noteService: FiltersService;
  public isChecked: boolean = false;
  public filters: FormGroup = new FormGroup({
    titleFilter: new FormGroup({
      value: new FormControl(''),
      type: new FormControl(TextFilterType.CONTAINS),
    }),
    usernameFilter: new FormGroup({
      value: new FormControl(''),
      type: new FormControl(TextFilterType.CONTAINS),
    }),
    bodyFilter: new FormGroup({
      value: new FormControl(''),
      type: new FormControl(TextFilterType.CONTAINS),
    }),
    dateFilter: new FormGroup({
      from: new FormControl(null),
      to: new FormControl(null),
      lastHour: new FormControl(false),
    }),
  });

  public titleFilterType: string = TextFilterType.CONTAINS;
  public userNameFilterType: string = TextFilterType.CONTAINS;
  public bodyFilterType: string = TextFilterType.CONTAINS;

  public filterTypes: string[] = [
    TextFilterType.CONTAINS,
    TextFilterType.EXACT,
    TextFilterType.STARTS_WITH,
  ];
  constructor() {}

  ngOnInit(): void {}

  public toggleChanged(): void {
    this.noteService.toggleSystem();
  }

  public setTitleType(): void {
    this.filters.get('titleFilter').get('type').setValue(this.titleFilterType);
    this.filterTitle();
  }

  public setUsernameType(): void {
    this.filters
      .get('usernameFilter')
      .get('type')
      .setValue(this.userNameFilterType);
    this.filterUserName();
  }

  public setBodyType(): void {
    this.filters.get('bodyFilter').get('type').setValue(this.bodyFilterType);
    this.filterBody();
  }

  public filterTitle(): void {
    this.noteService.setTitleFilter(this.filters.get('titleFilter').value);
  }

  public filterUserName(): void {
    this.noteService.setUsernameFilter(
      this.filters.get('usernameFilter').value
    );
  }

  public filterBody(): void {
    this.noteService.setBodyFilter(this.filters.get('bodyFilter').value);
  }

  public filterDateByRange(): void {
    this.noteService.setDateFilter(this.filters.get('dateFilter').value);
  }

  public filterDateByLastHour(): void {
    this.noteService.setDateFilter(this.filters.get('dateFilter').value);
  }
}
