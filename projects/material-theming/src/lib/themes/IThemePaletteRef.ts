export interface IThemePaletteRef<
  TVariants extends { [key: string]: string } = { [key: string]: string }
> {
  name: string;
  palette: string;
  variants: TVariants;
}
