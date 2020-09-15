import User from './users.model';

export default class UserState {
  users: User[];
}

export const initializeState = (): UserState => {
  return { users: [] };
};
