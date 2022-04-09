"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigReader = void 0;
const core = require("@actions/core");
class ConfigReader {
    static read() {
        const config = {};
        config.message = core.getInput("message", ConfigReader._requiredInput);
        config.mode = ConfigReader.readMode();
        config.pattern = ConfigReader.readOptionalString("pattern");
        config.matchJira = ConfigReader.readOptionalString("matchJira") !== undefined;
        config.checkJiraBranchName = ConfigReader.readOptionalString("checkJiraBranchName") !== undefined;
        config.githubToken = core.getInput("GITHUB_TOKEN", ConfigReader._requiredInput);
        return config;
    }
    static readMode() {
        const mode = core.getInput("mode", ConfigReader._optionalInput);
        if (mode === "comment") {
            return 0;
        }
        else if (mode === "fail") {
            return 1;
        }
        return 0;
    }
    static readOptionalString(name) {
        const tmp = core.getInput(name, ConfigReader._optionalInput);
        return tmp.length > 0 ? tmp : undefined;
    }
}
exports.ConfigReader = ConfigReader;
ConfigReader._requiredInput = { required: true };
ConfigReader._optionalInput = { required: false };
//# sourceMappingURL=action-config.js.map