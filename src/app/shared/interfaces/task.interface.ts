import { ITag } from "./tag.interface";

export interface ITask {
  id: number;
  name: string;
  date: string;
  tagIds?: number[];
  tags?: ITag[];
  important?: boolean;
  completed?: boolean;
  deleted?: boolean;
}
