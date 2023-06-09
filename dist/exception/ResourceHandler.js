"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../middlewares/Log"));
class ResourceHandler {
    static badRequest(res, payload) {
        Log_1.default.error('Bad request', { payload });
        return res
            .status(400)
            .send(payload);
    }
    static notFound(res, payload) {
        Log_1.default.error('Resource not found');
        return res
            .status(404)
            .send(payload);
    }
}
exports.default = ResourceHandler;
//# sourceMappingURL=ResourceHandler.js.map