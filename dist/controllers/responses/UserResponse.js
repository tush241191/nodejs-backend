"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserResponse {
    constructor(user) {
        this.user = user;
    }
    build() {
        const userData = {
            id: this.user.id,
            email: this.user.email,
            role: this.user.role,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            isActive: this.user.isActive,
            lastLoginAt: this.user.lastLoginAt
        };
        return userData;
    }
}
exports.default = UserResponse;
//# sourceMappingURL=UserResponse.js.map