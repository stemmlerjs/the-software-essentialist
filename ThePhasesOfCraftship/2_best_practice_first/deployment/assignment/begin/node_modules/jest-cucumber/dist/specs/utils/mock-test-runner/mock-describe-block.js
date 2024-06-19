"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDescribeBlock = void 0;
var MockDescribeBlock = /** @class */ (function () {
    function MockDescribeBlock(description, skip, concurrent, only) {
        this.description = null;
        this.skip = false;
        this.concurrent = false;
        this.only = false;
        this.children = [];
        this.description = description;
        this.skip = skip;
        this.concurrent = concurrent;
        this.only = only;
    }
    return MockDescribeBlock;
}());
exports.MockDescribeBlock = MockDescribeBlock;
//# sourceMappingURL=mock-describe-block.js.map