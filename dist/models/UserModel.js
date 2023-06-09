"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const IUser_1 = require("../interfaces/models/IUser");
const BaseModel_1 = __importDefault(require("./BaseModel"));
const Database_1 = __importDefault(require("../providers/Database"));
const lodash_1 = require("lodash");
class User extends BaseModel_1.default {
    constructor(user) {
        super();
        this.id = '';
        this.email = '';
        this.password = '';
        this.refreshId = '';
        this.firstName = '';
        this.lastName = '';
        this.role = IUser_1.UserRoles.CLIENT;
        this.isActive = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
        this.assignEntity(user);
    }
    isAdmin() {
        return this.role === IUser_1.UserRoles.ADMIN;
    }
    isClient() {
        return this.role === IUser_1.UserRoles.CLIENT;
    }
    evaluateAuthOrigin(authOrigin) {
        const originAllowanceMap = {
            [IUser_1.UserAuthOrigins.APP]: [IUser_1.UserRoles.CLIENT],
            [IUser_1.UserAuthOrigins.ADMIN]: [IUser_1.UserRoles.ADMIN]
        };
        if (!(0, lodash_1.includes)(originAllowanceMap[authOrigin], this.role)) {
            throw new Error('User role does not meet the criteria of the auth origin');
        }
        return authOrigin;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
User.service = Database_1.default.client.user;
User.tableName = client_1.Prisma.ModelName.User;
exports.default = User;
//# sourceMappingURL=UserModel.js.map