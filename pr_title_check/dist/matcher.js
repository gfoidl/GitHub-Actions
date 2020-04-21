"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matcher {
    static isMatch(pattern, title) {
        const regex = new RegExp(pattern);
        return regex.test(title);
    }
    static isJiraMatch(title) {
        const pattern = /^\[[A-Z]+-\d+\](\s.*)?$/g;
        return pattern.test(title);
    }
}
exports.default = Matcher;
//# sourceMappingURL=matcher.js.map