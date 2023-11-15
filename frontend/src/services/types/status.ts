export enum StatusEnum {
  ACTIVE = 1,
  INACTIVE = 2,
}

export type Status = {
  id: StatusEnum;
  name?: string;
};
