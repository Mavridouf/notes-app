import { Action, createReducer, on } from '@ngrx/store';
import * as UsersActions from '../actions/users.actions';
import UserState, { initializeState } from '../models/users.state';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(UsersActions.SuccessGetUsersAction, (state: UserState, { payload }) => {
    return { ...state, users: payload };
  })
);

export function usersReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
