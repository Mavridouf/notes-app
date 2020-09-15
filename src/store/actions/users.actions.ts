import { createAction, props } from '@ngrx/store';
import User from '../models/users.model';

export const SuccessGetUsersAction = createAction(
  '[Users] - Success Get Users',
  props<{ payload: User[] }>()
);
