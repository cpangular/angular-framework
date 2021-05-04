
export interface IColorList {
  [key: string]: string;
}

export interface IContrasts {
  contrast: IColorList;
}

export type IPaletteColors = IColorList & IContrasts;
