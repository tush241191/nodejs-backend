"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../middlewares/Log"));
/**
 * @TODO Handle errors from https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
 */
class DatabaseError extends Error {
    constructor(prismaError) {
        super(prismaError.message);
        this.assignValues(prismaError);
        Log_1.default.error(`Database error - ${this.message}`);
    }
    handle(res) {
        var _a, _b, _c, _d;
        const target = (_b = (_a = this.details) === null || _a === void 0 ? void 0 : _a.target) !== null && _b !== void 0 ? _b : '';
        const fieldName = (_d = (_c = this.details) === null || _c === void 0 ? void 0 : _c.field_name) !== null && _d !== void 0 ? _d : '';
        const errorMessageMap = {
            'P2002': `${target} field has to be unique`,
            'P2003': `Foreign key constraint failed on the field: ${fieldName}`,
            'P2025': 'An operation failed because it depends on one or more records that were required but not found'
        };
        const responseBody = {
            error: this.code,
            message: errorMessageMap[this.code]
        };
        return res
            .status(422)
            .send(responseBody);
    }
    isClientError() {
        return this.code.startsWith('P2');
    }
    isConstraintError() {
        return this.code === 'P2002';
    }
    isForeignKeyError() {
        return this.code === 'P2003';
    }
    isRecordNotFoundError() {
        return this.code === 'P2025';
    }
    assignValues(err) {
        this.code = err.code;
        this.details = err.meta;
    }
}
exports.default = DatabaseError;
//# sourceMappingURL=DatabaseError.js.map