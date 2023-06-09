"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Category extends BaseModel_1.default {
    constructor(category) {
        super();
        this.assignEntity(category);
    }
}
exports.default = Category;
//# sourceMappingURL=CategoryModel.js.map