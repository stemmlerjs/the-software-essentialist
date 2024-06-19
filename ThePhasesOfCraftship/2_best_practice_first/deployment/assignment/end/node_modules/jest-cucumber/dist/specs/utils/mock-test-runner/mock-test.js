"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTest = void 0;
var MockTest = /** @class */ (function () {
    function MockTest(description, executionFunc, skip, concurrent, only) {
        this.skip = false;
        this.concurrent = false;
        this.only = false;
        this.description = description;
        this.executionFunc = executionFunc;
        this.skip = skip;
        this.concurrent = concurrent;
        this.only = only;
    }
    return MockTest;
}());
exports.MockTest = MockTest;
//# sourceMappingURL=mock-test.js.map