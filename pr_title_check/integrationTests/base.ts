export default abstract class TestBase {
    protected setUp(payloadFile: string): void {
        const message             = "PR title doesn't match";
        const matchJira           = "1";
        const checkJiraBranchName = "1";
        const githubToken         = "token";

        // Mock the inputs
        process.env["INPUT_MESSAGE"]             = message;
        process.env["INPUT_MATCHJIRA"]           = matchJira;
        process.env["INPUT_CHECKJIRABRANCHNAME"] = checkJiraBranchName;
        process.env["INPUT_GITHUB_TOKEN"]        = githubToken;

        // Mock the GitHub context
        process.env["GITHUB_REPOSITORY"] = "gfoidl/GitHub-Actions";
        process.env["GITHUB_EVENT_PATH"] = payloadFile;
    }
}
