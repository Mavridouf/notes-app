export interface INote {
  title: string;
  body: string;
  userName: string;
  date: number;
}

export interface INodeResp {
  notes: INote[];
}

export default class Note implements INote {
  title: string;
  body: string;
  userName: string;
  date: number;
}
