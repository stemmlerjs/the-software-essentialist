"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
var crypto_1 = require("crypto");
var DomainEvent = /** @class */ (function () {
    function DomainEvent(name, data, aggregateId, id, retries, status, createdAt) {
        if (id === void 0) { id = (0, crypto_1.randomUUID)(); }
        if (retries === void 0) { retries = 0; }
        if (status === void 0) { status = 'INITIAL'; }
        if (createdAt === void 0) { createdAt = new Date().toISOString(); }
        this.name = name;
        this.data = data;
        this.aggregateId = aggregateId;
        this.id = id;
        this.retries = retries;
        this.status = status;
        this.createdAt = createdAt;
    }
    DomainEvent.prototype.getStatus = function () {
        return this.status;
    };
    DomainEvent.prototype.markPublished = function () {
        return this.status = 'PUBLISHED';
    };
    DomainEvent.prototype.recordFailureToProcess = function () {
        this.retries++;
        if (this.retries === 3) {
            this.status = 'FAILED';
            return;
        }
        this.status = 'RETRYING';
    };
    DomainEvent.prototype.getRetries = function () {
        return this.retries;
    };
    DomainEvent.prototype.serializeData = function () {
        return JSON.stringify(this.data);
    };
    DomainEvent.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    DomainEvent.toDomain = function (prismaEventModel) {
        return new DomainEvent(prismaEventModel.name, JSON.parse(prismaEventModel.data), prismaEventModel.aggregateId, prismaEventModel.id, prismaEventModel.retries, prismaEventModel.status, prismaEventModel.dateCreated.toISOString());
    };
    return DomainEvent;
}());
exports.DomainEvent = DomainEvent;
