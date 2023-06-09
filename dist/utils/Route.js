"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const concat_1 = __importDefault(require("lodash/concat"));
const Auth_1 = __importDefault(require("../middlewares/Auth"));
const IUser_1 = require("../interfaces/models/IUser");
const lodash_1 = require("lodash");
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
    static setMultiRoleMiddlewares(roles, additionalMiddlewares = []) {
        const getRoleMiddlewares = () => {
            const sortedRoles = (0, lodash_1.sortBy)(roles);
            const roleMiddleware = [Auth_1.default.requireJwt];
            if ((0, lodash_1.isEqual)(sortedRoles, (0, lodash_1.sortBy)([IUser_1.UserRoles.ADMIN, IUser_1.UserRoles.CLIENT]))) {
                roleMiddleware.push(Auth_1.default.requireClientOrAdminRole);
            }
            else {
                throw new Error('MultiRoleMiddleware does not have an appropriate match for the provided roles array');
            }
            return roleMiddleware;
        };
        return (0, concat_1.default)(getRoleMiddlewares(), additionalMiddlewares);
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map