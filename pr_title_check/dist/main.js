"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core = require("@actions/core");
const github = require("@actions/github");
function run() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const inputOptions = {
            required: false
        };
        const context = github.context;
        if (context.payload.pull_request == null) {
            console.log("No pull request found");
            return;
        }
        const message = core.getInput("message", inputOptions);
        const pattern = core.getInput("pattern", inputOptions);
        const matchJira = core.getInput("matchJira", inputOptions);
        const githubToken = core.getInput("GITHUB_TOKEN", { required: true });
        console.log("message:", message);
        console.log("pattern:", pattern);
        console.log("matchJira:", matchJira);
        console.log("githubToken:", githubToken);
    });
}
run();
//# sourceMappingURL=main.js.map