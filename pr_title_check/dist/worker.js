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
            console.log("------------------------------------------------");
            console.log(context.payload);
            console.log("------------------------------------------------");
            const commentInfo = Object.assign(Object.assign({}, context.repo), { issue_number: pullRequest.number });
            let isOK = true;
            if (!this.doesTitleMatch(pullRequest.title)) {
                yield this.reportNoMatch(commentInfo, tslib_1.__classPrivateFieldGet(this, _config).message);
                isOK = false;
            }
            if (tslib_1.__classPrivateFieldGet(this, _config).checkJiraBranchName) {
                const branch = pullRequest.head.ref;
                if (!matcher_1.default.doesBranchMatchJira(branch)) {
                    yield this.reportNoMatch(commentInfo, `The branch ${branch} doesn't match the expected Jira-conventions`);
                    isOK = false;
                }
            }
            if (isOK) {
                core.info("all checks passed");
            }
            else {
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
                    yield this.reportNoMathViaComment(info, message);
                    break;
                case 1:
                    core.setFailed(message);
                    break;
                default:
                    throw new Error("unknown mode");
            }
        });
    }
    reportNoMathViaComment(info, message) {
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