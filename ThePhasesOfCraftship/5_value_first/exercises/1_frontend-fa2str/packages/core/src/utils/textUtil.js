"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextUtil = void 0;
class TextUtil {
    static createRandomText(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";
        let text = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            text += charset.charAt(randomIndex);
        }
        return text;
    }
    static createRandomEmail() {
        const randomSequence = Math.floor(Math.random() * 1000000);
        return `testemail-${randomSequence}@gmail.com`;
    }
    static isMissingKeys(data, keysToCheckFor) {
        for (const key of keysToCheckFor) {
            if (data[key] === undefined)
                return true;
        }
        return false;
    }
    static isBetweenLength(str, min, max) {
        return str.length >= min && str.length <= max;
    }
}
exports.TextUtil = TextUtil;
