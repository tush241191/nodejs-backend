"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthHandler_1 = __importDefault(require("../exception/AuthHandler"));
const jwt_1 = require("../interfaces/utils/jwt");
const JsonWebToken_1 = __importDefault(require("../utils/JsonWebToken"));
const UserService_1 = __importDefault(require("../services/UserService"));
class Auth {
    static requireJwt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.get('Authorization');
            if (!authHeader) {
                return AuthHandler_1.default.notAuthenticated(res, 'A token is required for authentication');
            }
            try {
                const token = authHeader.substring(7, authHeader.length);
                const jwt = new JsonWebToken_1.default(jwt_1.JsonWebTokenTypes.USER).verify(token);
                req.user = yield UserService_1.default.get(jwt.userId);
                JsonWebToken_1.default.validateUserPayload(jwt, req.user);
            }
            catch (err) {
                return AuthHandler_1.default.notAuthenticated(res, 'Invalid token');
            }
            return next();
        });
    }
    static reqParamsSet(params) {
        return (req, res, next) => {
            params.forEach(param => {
                const reqParam = req.query[param];
                if (!reqParam) {
                    return AuthHandler_1.default.missingEntity(res, `Query param "${param}" missing from the request`);
                }
            });
            next();
        };
    }
    static requireClientRole(req, res, next) {
        try {
            if (!req.user.isClient()) {
                throw new Error('User must be of type client to perform the operation');
            }
        }
        catch (err) {
            return AuthHandler_1.default.forbidden(res, err.message);
        }
        return next();
    }
    static requireAdminRole(req, res, next) {
        try {
            if (!(req.user.isAdmin())) {
                throw new Error('User lacks permissions to perform the operation');
            }
        }
        catch (err) {
            return AuthHandler_1.default.forbidden(res, err.message);
        }
        return next();
    }
    static requireClientOrAdminRole(req, res, next) {
        try {
            if (!(req.user.isClient() || req.user.isAdmin())) {
                throw new Error('User must be of type client or admin to perform the operation');
            }
        }
        catch (err) {
            return AuthHandler_1.default.forbidden(res, err.message);
        }
        return next();
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map