export interface IRootState {
  email: string;
}

export interface ITasks {
  allTasks: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  description: string;
}
