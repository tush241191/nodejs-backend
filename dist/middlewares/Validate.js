"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const Validator_1 = __importDefault(require("../providers/Validator"));
class Validate {
    static requireValidUuid(req, res, next) {
        if (!validator_1.default.isUUID(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID provided' });
        }
        return next();
    }
    static requireSchema(schema, options = {}) {
        const schemaValidator = new Validator_1.default(options);
        return (req, res, next) => {
            const { body } = req;
            if (!body) {
                res.status(400).json({ error: 'missing request body' });
                return;
            }
            const { valid, errors, instance: validatedBody } = schemaValidator.validate(body, schema);
            if (!valid) {
                return res.status(400).json(Object.assign({ error: 'request body validation failed' }, { fieldErrors: schemaValidator.getFieldErrors(errors) }));
            }
            req.body = validatedBody;
            return next();
        };
    }
}
exports.default = Validate;
//# sourceMappingURL=Validate.js.map