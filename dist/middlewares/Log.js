"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
class Log {
    constructor() {
        this.pino = (0, pino_1.default)();
    }
    trace(msg, data = {}) {
        this.pino.trace(data, msg);
    }
    debug(msg, data = {}) {
        this.pino.debug(data, msg);
    }
    info(msg, data = {}) {
        this.pino.info(data, msg);
    }
    warn(msg, data = {}) {
        this.pino.warn(data, msg);
    }
    error(msg, data = {}) {
        this.pino.error(data, msg);
    }
    fatal(msg, data = {}) {
        this.pino.fatal(data, msg);
    }
}
exports.default = new Log;
//# sourceMappingURL=Log.js.map