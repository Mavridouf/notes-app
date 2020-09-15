import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import Note from 'src/store/models/notes.model';
import { map } from 'rxjs/operators';
import { title } from 'process';

export enum TextFilterType {
  EXACT = 'exact',
  CONTAINS = 'contains',
  STARTS_WITH = 'starts-with',
}

export enum SortFilter {
  ASC = 'Ascending',
  DESC = 'Descending',
}

export interface ITextFilter {
  value: string;
  type: string;
}

export interface IDateFilter {
  from: Date;
  to: Date;
  lastHour: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private _noteList: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
  public noteList$: Observable<Note[]> = this._noteList.asObservable();

  private _filterTitle: BehaviorSubject<ITextFilter> = new BehaviorSubject<
    ITextFilter
  >(null);
  public filterTitle$: Observable<
    ITextFilter
  > = this._filterTitle.asObservable();

  private _filterUserName: BehaviorSubject<ITextFilter> = new BehaviorSubject<
    ITextFilter
  >(null);
  public filterUserName$: Observable<
    ITextFilter
  > = this._filterUserName.asObservable();

  private _filterBody: BehaviorSubject<ITextFilter> = new BehaviorSubject<
    ITextFilter
  >(null);
  public filterBody$: Observable<ITextFilter> = this._filterBody.asObservable();

  private _filterDate: BehaviorSubject<IDateFilter> = new BehaviorSubject<
    IDateFilter
  >(null);
  public filterDate$: Observable<IDateFilter> = this._filterDate.asObservable();

  private _toggleSystem: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  public toggleSystem$: Observable<boolean> = this._toggleSystem.asObservable();

  private _sortFilter: BehaviorSubject<string> = new BehaviorSubject<string>(
    SortFilter.DESC
  );
  public sortFilter$: Observable<string> = this._sortFilter.asObservable();

  public setNotes(notes: Note[]) {
    this._noteList.next(notes);
  }

  public toggleSystem() {
    this._toggleSystem.next(!this._toggleSystem.value);
  }

  public setTitleFilter(title: ITextFilter) {
    this._filterTitle.next(title);
  }

  public setUsernameFilter(userName: ITextFilter) {
    this._filterUserName.next(userName);
  }

  public setBodyFilter(body: ITextFilter) {
    this._filterBody.next(body);
  }

  public setDateFilter(date: IDateFilter) {
    this._filterDate.next(date);
  }

  public setSortFilter(sortOrder: string) {
    this._sortFilter.next(sortOrder);
  }

  public get filteredList$(): Observable<Note[]> {
    return combineLatest(
      this.noteList$,
      this.toggleSystem$,
      this.filterTitle$,
      this.filterUserName$,
      this.filterBody$,
      this.filterDate$,
      this.sortFilter$
    ).pipe(
      map((filter) => {
        let list: Note[] = this._noteList.value;
        list = filter[1]
          ? this._noteList.value
              .slice()
              .filter((note) => note.userName !== 'system note')
          : list;
        list = filter[2]
          ? this._filterNotesByText(list, filter[2], 'title')
          : list;
        list = filter[3]
          ? this._filterNotesByText(list, filter[3], 'userName')
          : list;
        list = filter[4]
          ? this._filterNotesByText(list, filter[4], 'body')
          : list;
        list = filter[5] ? this._filterNotesByDate(list, filter[5]) : list;
        filter[6] ? this._sortNotesByDate(list, filter[6]) : null;
        return list;
      })
    );
  }

  private _filterNotesByText(
    noteList: Note[],
    filter: ITextFilter,
    prop: string
  ): Note[] {
    switch (filter.type) {
      case TextFilterType.CONTAINS: {
        return this._filterByContains(noteList, filter, prop);
      }
      case TextFilterType.EXACT: {
        return this._filterByExact(noteList, filter, prop);
      }
      case TextFilterType.STARTS_WITH: {
        return this._filterByStarsWith(noteList, filter, prop);
      }
      default:
        return noteList;
    }
  }

  private _filterByContains(
    noteList: Note[],
    filter: ITextFilter,
    prop: string
  ): Note[] {
    return noteList
      .slice()
      .filter((note) =>
        note[prop]
          .toLocaleLowerCase()
          .includes(filter.value.toLocaleLowerCase())
      );
  }

  private _filterByExact(
    noteList: Note[],
    filter: ITextFilter,
    prop: string
  ): Note[] {
    return noteList
      .slice()
      .filter(
        (note) =>
          note[prop].toLocaleLowerCase() === filter.value.toLocaleLowerCase()
      );
  }

  private _filterByStarsWith(
    noteList: Note[],
    filter: ITextFilter,
    prop: string
  ): Note[] {
    return noteList
      .slice()
      .filter((note) =>
        note[prop]
          .toLocaleLowerCase()
          .startsWith(filter.value.toLocaleLowerCase())
      );
  }

  private _filterNotesByDate(
    noteList: Note[],
    dateFilter: IDateFilter
  ): Note[] {
    return noteList.slice().filter((note) => {
      if (dateFilter.lastHour) {
        const today = new Date();
        const lastHour = new Date(today.getTime() - 1000 * 60 * 60);
        return new Date(note.date) > lastHour;
      }
      if (dateFilter.from && dateFilter.to) {
        return (
          new Date(note.date) > dateFilter.from &&
          new Date(note.date) < dateFilter.to
        );
      } else if (dateFilter.from) {
        return new Date(note.date) > dateFilter.from;
      } else if (dateFilter.to) {
        return new Date(note.date) < dateFilter.to;
      } else {
        return true;
      }
    });
  }

  private _sortNotesByDate(noteList: Note[], order: string): Note[] {
    if (order === SortFilter.DESC) {
      return noteList.sort((n1, n2) => {
        return new Date(n2.date).getTime() - new Date(n1.date).getTime();
      });
    } else {
      return noteList.sort((n1, n2) => {
        return new Date(n1.date).getTime() - new Date(n2.date).getTime();
      });
    }
  }
  constructor() {}
}
