"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Database_1 = __importDefault(require("../providers/Database"));
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Cart extends BaseModel_1.default {
    constructor(cart) {
        super();
        this.assignEntity(cart);
    }
}
Cart.service = Database_1.default.client.cart;
Cart.tableName = client_1.Prisma.ModelName.Cart;
exports.default = Cart;
//# sourceMappingURL=CartModel.js.map