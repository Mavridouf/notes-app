export interface IUser {
  id: string;
  name: string;
}

export interface IUserResp {
  users: IUser[];
}

export default class User implements IUser {
  id: string;
  name: string;
}
