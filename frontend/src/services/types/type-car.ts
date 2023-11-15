export enum TypeCarEnum {
  FLEX = 1,
  DIESEL = 2,
}

export enum TypeCarStringEnum {
  FLEX = '1',
  DIESEL = '2',
}

export type TypeCar = {
  id: TypeCarEnum;
  name?: string;
};
