
export class Collection<T> {
  private items: T[] = [];

  constructor (items: T[]) {
    this.items = items;
  }

  add (item: T) {
    this.items.push(item);
  }

  remove (item: T) {
    this.items = this.items.filter(i => i !== item);
  }

  getItems () {
    return this.items;
  }

  first () {
    return this.items[0];
  }

  last () {
    return this.items[this.items.length - 1];
  }
}
