
import { Posts } from "@dddforum/api";

export type PostsFilterValue = Posts.Queries.GetPostsQueryOption;

export class SearchFilterViewModel {
  private _value: PostsFilterValue;

  constructor (value: PostsFilterValue) {
    this._value = value;
  }

  get value () {
    return this._value;
  }
}
