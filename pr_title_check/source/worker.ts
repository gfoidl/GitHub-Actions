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

        const commentInfo: CommentMetaInfo = {
            ...context.repo,
            issue_number: pullRequest.number
        }

        let hasChecksPassed = true;
        let messsage        = "";

        if (!this.doesTitleMatch(pullRequest.title)) {
            messsage        = this.#config.message;
            hasChecksPassed = false;

            core.info("title does not match");
        } else {
            core.info("title does match");
        }

        if (this.#config.checkJiraBranchName) {
            core.info("checking branch...");

            const branch = pullRequest.head.ref;

            if (!Matcher.doesBranchMatchJira(branch)) {
                if (!hasChecksPassed) {
                    messsage += "\n";
                }

                messsage       += `The branch \`${branch}\` doesn't match the expected Jira-conventions.`;
                hasChecksPassed = false;

                core.info("branch does not match");
            } else {
                core.info("branch does match");
            }
        }

        if (hasChecksPassed) {
            core.info("all checks passed");
        } else {
            await this.reportNoMatch(commentInfo, messsage);
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
                await this.reportNoMatchViaComment(info, message);
                core.info("no match -- created comment")
                break;
            case config.Mode.fail:
                core.info("no match -- will fail");
                core.setFailed(message);
                break;
            default:
                throw new Error("unknown mode");
        }
    }
    //-------------------------------------------------------------------------
    private async reportNoMatchViaComment(info: CommentMetaInfo, message: string): Promise<void> {
        const octokit = new github.GitHub(this.#config.githubToken);

        // create a timeline comment, not a review-comment, so don't use
        // octokit.pulls.createComment
        const newComment = await octokit.issues.createComment({
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
