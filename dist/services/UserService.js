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
const crypto_1 = require("crypto");
const DatabaseError_1 = __importDefault(require("../exception/DatabaseError"));
const IUser_1 = require("../interfaces/models/IUser");
const Log_1 = __importDefault(require("../middlewares/Log"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const password_1 = require("../utils/password");
const BaseService_1 = __importDefault(require("./BaseService"));
const generateRandomToken = () => {
    return (0, crypto_1.randomBytes)(48).toString('base64').replace(/[+/]/g, '.');
};
class UserService extends BaseService_1.default {
    static list() {
        const _super = Object.create(null, {
            list: { get: () => super.list }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield _super.list.call(this, {
                    service: UserModel_1.default.service
                });
                return userList.map((user) => new UserModel_1.default(user));
            }
            catch (err) {
                Log_1.default.error(`Error :: ${err}'`);
            }
            return []; // Default return value
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.service.findUniqueOrThrow({
                    where: { id }
                });
                return new UserModel_1.default(user);
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
    static authenticateWithPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.service.findUnique({
                    where: { email: username },
                    select: {
                        id: true,
                        password: true,
                        deletedAt: true,
                        isActive: true,
                        role: true
                    }
                });
                if (!user)
                    return null;
                const isPasswordValid = yield (0, password_1.validatePassword)(password, user.password);
                const isUserActive = user.isActive && user.deletedAt === null;
                if (!isPasswordValid || !isUserActive)
                    return null;
                user.lastLoginAt = new Date();
                const updatedUser = yield UserModel_1.default.service.update({
                    where: { id: user.id },
                    data: { lastLoginAt: user.lastLoginAt }
                });
                return new UserModel_1.default(updatedUser);
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
    static create(payload, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload.role === IUser_1.UserRoles.ADMIN && (payload.clientId || payload.producerId)) {
                throw new Error('Admin users cannot be linked to clients/producers');
            }
            const userPasswordHash = yield (0, password_1.generatePasswordHash)(password);
            const buildUserData = () => {
                const userData = {
                    email: payload.email,
                    role: payload.role,
                    isActive: payload.isActive,
                    firstName: payload.firstName,
                    lastName: payload.lastName
                };
                return userData;
            };
            try {
                const data = Object.assign(Object.assign({}, buildUserData()), {
                    password: userPasswordHash,
                    refreshId: generateRandomToken()
                });
                const user = yield UserModel_1.default.service.create({
                    data: data
                });
                delete user.refreshId;
                return new UserModel_1.default(user);
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
    static setPassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield (0, password_1.generatePasswordHash)(password); // eslint-disable-line
            try {
                if (user.id) {
                    return UserModel_1.default.service.update({
                        where: { id: user.id },
                        data: { password: user.password }
                    });
                }
                return user;
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
    static regenerateRefreshId(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield UserModel_1.default.service.update({
                    where: { id: user.id },
                    data: {
                        refreshId: generateRandomToken()
                    }
                });
                return new UserModel_1.default(updatedUser);
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
    static regenerateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.token = generateRandomToken(); // eslint-disable-line
            try {
                if (user.id) {
                    return UserModel_1.default.service.update({
                        where: { id: user.id },
                        data: { password: user.password }
                    });
                }
                return user;
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map