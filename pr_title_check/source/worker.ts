import * as config from "./action-config";
import Matcher     from './matcher';
import * as core   from "@actions/core";
import * as github from "@actions/github";
//-----------------------------------------------------------------------------
export default class Worker {
    readonly #config: config.ActionConfig;
    //-------------------------------------------------------------------------
    constructor() {
        this.#config = config.ConfigReader.read();
    }
    //-------------------------------------------------------------------------
    public async run(): Promise<void> {
        const context     = github.context;
        const pullRequest = context.payload.pull_request;

        if (!pullRequest) {
            //core.setFailed("No pull request found");
            core.info("No pull request found -- no further action");
            return;
        }

        console.log("------------------------------------------------");
        console.log(context.payload);
        console.log("------------------------------------------------");

        const commentInfo: CommentMetaInfo = {
            ...context.repo,
            issue_number: pullRequest.number
        }

        let isOK = true;

        if (!this.doesTitleMatch(pullRequest.title)) {
            await this.reportNoMatch(commentInfo, this.#config.message);
            isOK = false;
        }

        if (this.#config.checkJiraBranchName) {
            const branch = pullRequest.head.ref;

            if (!Matcher.doesBranchMatchJira(branch)) {
                await this.reportNoMatch(commentInfo, `The branch ${branch} doesn't match the expected Jira-conventions`);
                isOK = false;
            }
        }

        if (isOK) {
            core.info("all checks passed");
        } else {
            core.info("checks failed, reported them");
        }
    }
    //-------------------------------------------------------------------------
    private doesTitleMatch(title: string): boolean {
        if (this.#config.matchJira) {
            return Matcher.doesTitleMatchJira(title);
        } else if (this.#config.pattern) {
            return Matcher.doesTitleMatch(this.#config.pattern, title);
        }

        throw new Error("either 'matchJira' or a 'pattern' must be given");
    }
    //-------------------------------------------------------------------------
    private async reportNoMatch(info: CommentMetaInfo, message: string): Promise<void> {
        switch (this.#config.mode) {
            case config.Mode.comment:
                await this.reportNoMathViaComment(info, message);
                break;
            case config.Mode.fail:
                core.setFailed(message);
                break;
            default:
                throw new Error("unknown mode");
        }
    }
    //-------------------------------------------------------------------------
    private async reportNoMathViaComment(info: CommentMetaInfo, message: string): Promise<void> {
        const githubClient = new github.GitHub(this.#config.githubToken);

        // create a timeline comment, not a review-comment, so don't use
        // githubClient.pulls.createComment
        const newComment = await githubClient.issues.createComment({
            ...info,
            body: message
        });

        core.debug(JSON.stringify(newComment));
    }
}
//-----------------------------------------------------------------------------
interface CommentMetaInfo {
    owner       : string;
    repo        : string;
    issue_number: number;
}
