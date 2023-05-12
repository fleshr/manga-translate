export interface IPage {
  id: number;
  url: string;
  textBoxes: ITextBox[];
}

export interface ITextBox {
  id: number;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rawText: string;
  translatedText: string;
}

export type ITools = "view" | "read" | "add" | "remove";
