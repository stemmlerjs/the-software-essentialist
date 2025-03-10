import { Queries } from "@dddforum/shared/src/api/posts";

export type PostsFilterValue = Queries.GetPostsQueryOption;

export class SearchFilterViewModel {
  private _value: PostsFilterValue;

  constructor (value: PostsFilterValue) {
    this._value = value;
  }

  get value () {
    return this._value;
  }
}
