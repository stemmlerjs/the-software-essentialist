export class Collection<T> {
  private items: T[] = [];

  constructor (items: T[]) {
    this.items = items;
  }

  protected add (item: T) {
    this.items.push(item);
  }

  protected remove (item: T) {
    this.items = this.items.filter(i => i !== item);
  }

  protected getItems () {
    return this.items;
  }

  protected first () {
    return this.items[0];
  }

  protected last () {
    return this.items[this.items.length - 1];
  }
}