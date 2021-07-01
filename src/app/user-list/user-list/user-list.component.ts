import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import UserState from 'src/store/models/users.state';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/store/models/users.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private users$: Observable<UserState>;
  public users: IUser[];
  private storeUsersSubscription: Subscription;

  constructor(private store: Store<{ users: UserState }>) {
    this.users$ = store.pipe(select('users'));
  }
  ngOnInit(): void {
    this.storeUsersSubscription = this.users$
      .pipe(
        map((userState) => {
          if (userState) {
            this.users = userState.users;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.storeUsersSubscription) {
      this.storeUsersSubscription.unsubscribe();
    }
  }
}
