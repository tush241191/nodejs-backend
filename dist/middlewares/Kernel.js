"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http_1 = __importDefault(require("./Http"));
class Kernel {
    static init(_express) {
        // Mount basic express apis middleware
        _express = Http_1.default.mount(_express);
        return _express;
    }
}
exports.default = Kernel;
//# sourceMappingURL=Kernel.js.map