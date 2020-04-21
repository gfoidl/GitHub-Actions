"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matcher {
    static doesTitleMatch(pattern, title) {
        const regex = new RegExp(pattern);
        return regex.test(title);
    }
    static doesTitleMatchJira(title) {
        return /^\[[A-Z]+-\d+\](\s.*)?$/g.test(title);
    }
    static doesBranchMatchJira(branch) {
        return /^[A-Z]+-\d+(_|-|$)/g.test(branch);
    }
}
exports.default = Matcher;
//# sourceMappingURL=matcher.js.map