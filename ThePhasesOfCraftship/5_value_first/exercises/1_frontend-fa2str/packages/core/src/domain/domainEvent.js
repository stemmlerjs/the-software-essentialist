"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
const crypto_1 = require("crypto");
// Define the expected structure instead of importing from Prisma
class DomainEvent {
    name;
    data;
    aggregateId;
    id;
    retries;
    status;
    createdAt;
    constructor(name, data, aggregateId, id = (0, crypto_1.randomUUID)(), retries = 0, status = 'INITIAL', createdAt = new Date().toISOString()) {
        this.name = name;
        this.data = data;
        this.aggregateId = aggregateId;
        this.id = id;
        this.retries = retries;
        this.status = status;
        this.createdAt = createdAt;
    }
    getStatus() {
        return this.status;
    }
    markPublished() {
        return this.status = 'PUBLISHED';
    }
    recordFailureToProcess() {
        this.retries++;
        if (this.retries === 3) {
            this.status = 'FAILED';
            return;
        }
        this.status = 'RETRYING';
    }
    getRetries() {
        return this.retries;
    }
    serializeData() {
        return JSON.stringify(this.data);
    }
    serialize() {
        return JSON.stringify(this);
    }
    static toDomain(eventModel) {
        return new DomainEvent(eventModel.name, JSON.parse(eventModel.data), eventModel.aggregateId, eventModel.id, eventModel.retries, eventModel.status, eventModel.dateCreated.toISOString());
    }
}
exports.DomainEvent = DomainEvent;
