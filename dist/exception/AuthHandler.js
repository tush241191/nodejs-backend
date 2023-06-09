"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../middlewares/Log"));
class AuthHandler {
    static notAuthenticated(res, message) {
        Log_1.default.error('User not authenticated');
        return res
            .status(401)
            .send({ error: message });
    }
    static forbidden(res, message) {
        Log_1.default.error('User does not have privileges to perform the action');
        return res
            .status(403)
            .send({ error: message });
    }
    static missingEntity(res, message) {
        Log_1.default.error('Unprocessable Entity in the Auth request');
        return res
            .status(422)
            .send({ error: message });
    }
}
exports.default = AuthHandler;
//# sourceMappingURL=AuthHandler.js.map