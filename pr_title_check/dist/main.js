"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("./worker");
const core = require("@actions/core");
const worker = new worker_1.default();
worker.run().catch(e => core.setFailed(e.message));
//# sourceMappingURL=main.js.map