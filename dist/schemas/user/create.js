"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IUser_1 = require("../../interfaces/models/IUser");
exports.default = {
    type: 'object',
    required: [
        'email',
        'password',
        'role',
        'isActive',
        'firstName',
        'lastName'
    ],
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8, maxLength: 128 },
        role: { type: 'string', enum: Object.values(IUser_1.UserRoles) },
        isActive: { type: 'boolean' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
    }
};
//# sourceMappingURL=create.js.map