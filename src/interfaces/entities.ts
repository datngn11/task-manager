export interface IRootState {
  email: string;
}

export interface ITasks {
  allTasks: ITask[];
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
}

export interface ICardsLists {
  isFetching: boolean;
  allLists: ICardsList[];
  allCardsImg: ICardsImg[];
}

export interface ICardsList {
  id: string;
  title: string;
  cards: ICard[];
}

export interface ICard {
  id: string;
  src: string;
}

export interface IImgList {
  allImg: ICardsImg[];
}

export interface ICardsImg {
  id: string;
  src: string;
}
