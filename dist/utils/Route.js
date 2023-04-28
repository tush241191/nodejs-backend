"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const concat_1 = __importDefault(require("lodash/concat"));
const Auth_1 = __importDefault(require("../middlewares/Auth"));
class Route {
    static setAdminMiddleWares(additionalMiddlewares = []) {
        const defaultAdminMiddlewares = [
            Auth_1.default.requireJwt,
            Auth_1.default.requireAdminRole
        ];
        return (0, concat_1.default)(defaultAdminMiddlewares, additionalMiddlewares);
    }
    static setClientMiddleWares(additionalMiddlewares = []) {
        const defaultClientMiddlewares = [
            Auth_1.default.requireJwt,
            Auth_1.default.requireClientRole
        ];
        return (0, concat_1.default)(defaultClientMiddlewares, additionalMiddlewares);
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map