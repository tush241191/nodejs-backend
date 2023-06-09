"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../interfaces/utils/jwt");
const Locals_1 = __importDefault(require("../providers/Locals"));
class JsonWebToken {
    constructor(type) {
        this.type = type;
        this.secret = this.setTypeSecret();
        this.expirationTime = this.setExpirationTime();
    }
    generate(payload) {
        const jwtPayload = this.buildTypePayload(payload);
        const jwtOptions = { expiresIn: this.expirationTime };
        return jsonwebtoken_1.default.sign(jwtPayload, this.secret, jwtOptions);
    }
    buildTypePayload(payload) {
        const typePayloads = {
            [jwt_1.JsonWebTokenTypes.USER]: {
                userId: payload.id,
                userEmail: payload.email,
                refreshId: payload.refreshId
            }
        };
        this.validateTypeValDefinition(typePayloads);
        return typePayloads[this.type];
    }
    setTypeSecret() {
        const typeSecrets = {
            [jwt_1.JsonWebTokenTypes.USER]: Locals_1.default.config().jwtSecretUser
        };
        this.validateTypeValDefinition(typeSecrets);
        return typeSecrets[this.type];
    }
    setExpirationTime() {
        const typeExpTimes = {
            [jwt_1.JsonWebTokenTypes.USER]: '1h'
        };
        this.validateTypeValDefinition(typeExpTimes);
        return typeExpTimes[this.type];
    }
    validateTypeValDefinition(values) {
        if (!(this.type in values)) {
            throw new Error('Type value has not been defined');
        }
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
    static validateUserPayload(jwt, user) {
        if (jwt.refreshId !== user.refreshId) {
            throw new Error('Refresh ID is invalid or expired');
        }
    }
}
exports.default = JsonWebToken;
//# sourceMappingURL=JsonWebToken.js.map