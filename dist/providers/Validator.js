"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const jsonschema_1 = require("jsonschema");
class Validator {
    constructor(options) {
        this.setFormatPhoneNumber = (input) => {
            return !!input.match(/^\+?\d+(?:[ ]?\d+)*$/);
        };
        this.setFormatName = (input) => {
            return !!input.match(/(\w.+\s).+/);
        };
        /**
         * ^            Start anchor
         * (?=.*[A-Z])  Ensure string has at least one uppercase letters.
         * (?=.*[0-9])  Ensure string has at least one digit.
         * (?=.*[a-z])  Ensure string has at least one lowercase letters.
         * .{8,}        Ensure string has minimum of length 8.
         * $            End anchor.
         */
        this.setFormatPassword = (input) => {
            return !!input.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/);
        };
        this.options = options;
        this.schemaValidator = new jsonschema_1.Validator();
        this.setCustomFormats();
    }
    validate(body, schema) {
        return this.schemaValidator.validate(body, schema, this.getOptions());
    }
    getFieldErrors(errors) {
        const errorsArr = errors.map((error) => {
            const buildFieldName = () => {
                if (error.property === 'instance')
                    return error.property;
                return error.property.replace('instance.', '');
            };
            return { [buildFieldName()]: error.message };
        });
        return Object.assign({}, ...errorsArr);
    }
    getOptions() {
        return Object.assign({ required: true }, this.options);
    }
    setCustomFormats() {
        this.schemaValidator.customFormats.phoneNumber = this.setFormatPhoneNumber;
        this.schemaValidator.customFormats.name = this.setFormatName;
        this.schemaValidator.customFormats.password = this.setFormatPassword;
    }
}
exports.Validator = Validator;
exports.default = Validator;
//# sourceMappingURL=Validator.js.map