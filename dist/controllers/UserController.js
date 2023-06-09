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
const UserService_1 = __importDefault(require("../services/UserService"));
const UserResponse_1 = __importDefault(require("./responses/UserResponse"));
const ResourceHandler_1 = __importDefault(require("../exception/ResourceHandler"));
const AuthHandler_1 = __importDefault(require("../exception/AuthHandler"));
const JsonWebToken_1 = __importDefault(require("../utils/JsonWebToken"));
const jwt_1 = require("../interfaces/utils/jwt");
const DatabaseError_1 = __importDefault(require("../exception/DatabaseError"));
class UserController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, authOrigin } = req.body;
                const user = yield UserService_1.default.authenticateWithPassword(username, password);
                if (!user) {
                    return AuthHandler_1.default.notAuthenticated(res, 'Authentication failed');
                }
                user.evaluateAuthOrigin(authOrigin);
                const userResponse = new UserResponse_1.default(user);
                return res.json({
                    user: userResponse.build(),
                    token: new JsonWebToken_1.default(jwt_1.JsonWebTokenTypes.USER).generate(user)
                });
            }
            catch (err) {
                return AuthHandler_1.default.notAuthenticated(res, err.message);
            }
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield UserService_1.default.list();
                const response = userList.map(user => {
                    const resp = new UserResponse_1.default(user);
                    return resp.build();
                });
                res.json(response);
            }
            catch (err) {
                const errPayload = { error: 'Failed to fetch users list', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqData = req.body;
            try {
                const newUser = yield UserService_1.default.create(reqData, reqData.password);
                const userResponse = new UserResponse_1.default(newUser);
                res.json({
                    user: userResponse.build()
                });
            }
            catch (err) {
                if (err instanceof DatabaseError_1.default) {
                    return err.handle(res);
                }
                const errPayload = { error: 'Failed to create a user', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
    static validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResponse = new UserResponse_1.default(req.user);
            return res.json({
                user: userResponse.build()
            });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map