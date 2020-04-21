import Worker    from "./worker";
import * as core from "@actions/core";
//-----------------------------------------------------------------------------
const worker = new Worker();
worker.run().catch(e => core.setFailed(e.message));
