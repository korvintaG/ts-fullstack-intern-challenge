export type Cat = {
  id: string,
  url: string,
  width: number,
  height: number
}

export const enum RequestStatus {
  Idle = "idle",
  Loading = "loading",
  Finding = "finding",
  SuccessLoadedList = "successLoadedList",
  SuccessLoadedRecord = "successLoadedRecord",
  Failed = "failed",
  FailedUpdate = "failedUpdate",
  FailedAdd = "failedAdd",
  FailedDelete = "failedDelete",
  Updated = "updated",
  Added = "added",
  Deleted = "deleted",
}

export type RequestStatusKey = keyof typeof RequestStatus;
export type RequestStatusValue = (typeof RequestStatus)[RequestStatusKey];


export interface SliceData<T> {
  list: T[];
  current: T | null | undefined;
  status: RequestStatusValue;
  error: string;
}

export type Correlation = {
  id: string;
  URL: string;
}

export interface CatSliceData<T> extends SliceData<T> {
  correlations: Correlation[];
}

export type CatLike = {
  cat_id: string;
  created_at: Date;
  URL?: string; // вначале нету
}

export type DataCatLike = {
  data: CatLike[];
}

export type SuccessResult = {
  result: 'success',
  id: string;
}