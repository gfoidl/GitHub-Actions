// Based on https://github.com/actions/toolkit/blob/master/docs/github-package.md#writing-unit-tests-for-your-action
//-----------------------------------------------------------------------------
import "module-alias/register";
import TestBase                       from "./base";
import { TestFixture, Test, Timeout } from "alsatian";
import * as nock                      from "nock";
import * as path                      from "path";
//-----------------------------------------------------------------------------
@TestFixture()
export class ActionTests extends TestBase {
    @Test()
    @Timeout(10_000)
    public async PR_title_and_branch_do_not_match_Jira___comment_created() {
        const payloadFile = path.join(__dirname, "../../", "integrationTests", "data", "payload_title_branch_ko.json");

        super.setUp(payloadFile);

        nock("https://api.github.com")
            .post("/repos/gfoidl/GitHub-Actions/issues/2/comments", { "body": "PR title doesn't match\nThe branch `dummy_pr` doesn't match the expected Jira-conventions." })
            .reply(200);

        // Don't import on top, because the GitHub-context (used by the worker) will populate it's state
        // based on environment variables in the ctor.
        const worker = require("@source/worker");
        const sut    = new worker.default();   // here it's javascript

        await sut.run();
    }
}
