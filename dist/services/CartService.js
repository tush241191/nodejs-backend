"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseError_1 = __importDefault(require("../exception/DatabaseError"));
const CartModel_1 = __importDefault(require("../models/CartModel"));
const BaseService_1 = __importDefault(require("./BaseService"));
class CartService extends BaseService_1.default {
    static create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield CartModel_1.default.service.create({
                    data: payload,
                    include: {
                        user: true,
                        device: true
                    }
                });
                return new CartModel_1.default(cart);
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
}
exports.default = CartService;
//# sourceMappingURL=CartService.js.map