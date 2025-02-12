import { GetPostsQueryOption } from "@dddforum/shared/src/api/posts";

export type FilterValue = GetPostsQueryOption;

export class SearchFilterViewModel {
  private _value: FilterValue;

  constructor (value: FilterValue) {
    this._value = value;
  }

  get value () {
    return this._value;
  }
}
