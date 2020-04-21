"use strict";
var _config;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config = require("./action-config");
const matcher_1 = require("./matcher");
const core = require("@actions/core");
const github = require("@actions/github");
class Worker {
    constructor() {
        _config.set(this, void 0);
        tslib_1.__classPrivateFieldSet(this, _config, config.ConfigReader.read());
    }
    run() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const context = github.context;
            const pullRequest = context.payload.pull_request;
            if (!pullRequest) {
                core.info("No pull request found -- no further action");
                return;
            }
            const commentInfo = Object.assign(Object.assign({}, context.repo), { issue_number: pullRequest.number });
            let hasCheckedPassed = true;
            let messsage = "";
            if (!this.doesTitleMatch(pullRequest.title)) {
                messsage = tslib_1.__classPrivateFieldGet(this, _config).message;
                hasCheckedPassed = false;
                core.info("title does not match");
            }
            else {
                core.info("title does match");
            }
            if (tslib_1.__classPrivateFieldGet(this, _config).checkJiraBranchName) {
                core.info("checking branch...");
                const branch = pullRequest.head.ref;
                if (!matcher_1.default.doesBranchMatchJira(branch)) {
                    if (!hasCheckedPassed) {
                        messsage += "\n";
                    }
                    messsage += `The branch \`${branch}\` doesn't match the expected Jira-conventions.`;
                    hasCheckedPassed = false;
                    core.info("branch does not match");
                }
                else {
                    core.info("branch does match");
                }
            }
            if (hasCheckedPassed) {
                core.info("all checks passed");
            }
            else {
                yield this.reportNoMatch(commentInfo, messsage);
                core.info("checks failed, reported them");
            }
        });
    }
    doesTitleMatch(title) {
        if (tslib_1.__classPrivateFieldGet(this, _config).matchJira) {
            return matcher_1.default.doesTitleMatchJira(title);
        }
        else if (tslib_1.__classPrivateFieldGet(this, _config).pattern) {
            return matcher_1.default.doesTitleMatch(tslib_1.__classPrivateFieldGet(this, _config).pattern, title);
        }
        throw new Error("either 'matchJira' or a 'pattern' must be given");
    }
    reportNoMatch(info, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            switch (tslib_1.__classPrivateFieldGet(this, _config).mode) {
                case 0:
                    yield this.reportNoMatchViaComment(info, message);
                    core.info("no match -- created comment");
                    break;
                case 1:
                    core.info("no match -- will fail");
                    core.setFailed(message);
                    break;
                default:
                    throw new Error("unknown mode");
            }
        });
    }
    reportNoMatchViaComment(info, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const githubClient = new github.GitHub(tslib_1.__classPrivateFieldGet(this, _config).githubToken);
            const newComment = yield githubClient.issues.createComment(Object.assign(Object.assign({}, info), { body: message }));
            core.debug(JSON.stringify(newComment));
        });
    }
}
exports.default = Worker;
_config = new WeakMap();
//# sourceMappingURL=worker.js.map