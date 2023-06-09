"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../middlewares/Log"));
const Express_1 = __importDefault(require("./Express"));
const Locals_1 = __importDefault(require("./Locals"));
class App {
    loadServer() {
        Log_1.default.info(`Listening on 0.0.0.0:${Locals_1.default.config().port}`);
        Express_1.default.init();
    }
}
exports.default = new App;
//# sourceMappingURL=App.js.map