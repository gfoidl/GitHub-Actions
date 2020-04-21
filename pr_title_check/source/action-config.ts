import * as core from "@actions/core";
//-----------------------------------------------------------------------------
export const enum Mode {
    comment,
    fail
}
//-----------------------------------------------------------------------------
export interface ActionConfig {
    message            : string;
    mode               : Mode;
    pattern?           : string;
    matchJira          : boolean;
    checkJiraBranchName: boolean;
    githubToken        : string;
}
//-----------------------------------------------------------------------------
export class ConfigReader {
    private static readonly _requiredInput: core.InputOptions = { required: true };
    private static readonly _optionalInput: core.InputOptions = { required: false };
    //-------------------------------------------------------------------------
    public static read(): ActionConfig {
        const config: ActionConfig = {} as ActionConfig;

        config.message             = core.getInput("message", ConfigReader._requiredInput);
        config.mode                = ConfigReader.readMode();
        config.pattern             = ConfigReader.readOptionalString("pattern");
        config.matchJira           = ConfigReader.readOptionalString("matchJira")           !== undefined;
        config.checkJiraBranchName = ConfigReader.readOptionalString("checkJiraBranchName") !== undefined;
        config.githubToken         = core.getInput("GITHUB_TOKEN", ConfigReader._requiredInput);

        return config;
    }
    //-------------------------------------------------------------------------
    private static readMode(): Mode {
        const mode = core.getInput("mode", ConfigReader._optionalInput);

        if (mode === "comment") {
            return Mode.comment;
        } else if (mode === "fail") {
            return Mode.fail;
        }

        return Mode.comment;
    }
    //-------------------------------------------------------------------------
    private static readOptionalString(name: string): string | undefined {
        const tmp = core.getInput(name, ConfigReader._optionalInput);

        return tmp.length > 0 ? tmp : undefined;
    }
}
