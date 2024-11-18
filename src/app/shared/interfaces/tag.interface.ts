import { EColor } from "../enums/color.enum";

export interface ITag {
  id: number;
  code: string;
  title: string;
  color: EColor;
}
