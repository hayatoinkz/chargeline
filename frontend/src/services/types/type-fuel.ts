export enum TypeFuelStringEnum {
  GASOLINE = '1',
  ETHANOL = '2',
  DIESEL = '3',
}

export enum TypeFuelEnum {
  GASOLINE = 1,
  ETHANOL = 2,
  DIESEL = 3,
}

export type TypeFuel = {
  id: TypeFuelEnum;
  name: string;
  price: number;
};
