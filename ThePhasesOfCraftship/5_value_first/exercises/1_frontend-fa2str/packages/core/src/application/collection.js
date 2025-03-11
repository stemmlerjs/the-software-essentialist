"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
class Collection {
    items = [];
    constructor(items) {
        this.items = items;
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        this.items = this.items.filter(i => i !== item);
    }
    getItems() {
        return this.items;
    }
    first() {
        return this.items[0];
    }
    last() {
        return this.items[this.items.length - 1];
    }
}
exports.Collection = Collection;
