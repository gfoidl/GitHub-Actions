"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = require("@actions/core");
function run() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const promise = new Promise(res => {
            setTimeout(() => res(), 100);
        });
        yield promise;
        const titlePattern = core.getInput("pattern");
        console.log(titlePattern);
    });
}
run();
function add(a, b) {
    return a + b;
}
exports.add = add;
exports.diff = (a, b) => a - b;
//# sourceMappingURL=main.js.map