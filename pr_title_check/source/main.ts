import * as core from "@actions/core";
import * as github from "@actions/github";
import Matcher from './matcher';
//-----------------------------------------------------------------------------
async function run(): Promise<void> {
    try {
        const inputOptions: core.InputOptions = {
            required: false
        }

        const context = github.context;

        if (context.payload.pull_request == null) {
            //core.setFailed("No pull request found");
            console.log("No pull request found");
            return;
        }

        const message: string = core.getInput("message", inputOptions);
        const pattern: string = core.getInput("pattern", inputOptions);
        const matchJira: string = core.getInput("matchJira", inputOptions);
        const githubToken: string = core.getInput("GITHUB_TOKEN", { required: true });

        const pullRequest = context.payload.pull_request;

        let doesTitleMatch = false;

        if (matchJira == "1") {
            doesTitleMatch = Matcher.isJiraMatch(pullRequest.title);
        } else if (pattern != null) {
            doesTitleMatch = Matcher.isMatch(pattern, pullRequest.tile);
        } else {
            core.setFailed("Either 'matchJira' or a 'pattern' must be given");
        }

        if (doesTitleMatch) {
            console.log("Title does math -- no further action");
            return;
        }

        const octokit = new github.GitHub(githubToken);
        const newComment = octokit.issues.createComment({
            ...context.repo,
            issue_number: pullRequest.number,
            body: message
        });

        console.log(newComment);
    } catch (error) {
        core.setFailed(error.message);
    }
}
//-----------------------------------------------------------------------------
run();
