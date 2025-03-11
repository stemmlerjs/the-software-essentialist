"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
class AggregateRoot {
    domainEvents = [];
    getDomainEvents() {
        return this.domainEvents;
    }
}
exports.AggregateRoot = AggregateRoot;
