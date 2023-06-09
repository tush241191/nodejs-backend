"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IUser_1 = require("../../interfaces/models/IUser");
exports.default = {
    type: 'object',
    properties: {
        username: { type: 'string', format: 'email' },
        password: { type: 'string' },
        authOrigin: { type: 'string', enum: Object.values(IUser_1.UserAuthOrigins) }
    },
    required: ['username', 'password', 'authOrigin']
};
//# sourceMappingURL=login.js.map