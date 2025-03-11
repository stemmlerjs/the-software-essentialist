"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtil = void 0;
class NumberUtil {
    static generateRandomInteger(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }
}
exports.NumberUtil = NumberUtil;
