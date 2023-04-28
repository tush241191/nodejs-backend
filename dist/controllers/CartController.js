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
const DeviceService_1 = __importDefault(require("../services/DeviceService"));
const DeviceModel_1 = __importDefault(require("../models/DeviceModel"));
const CartService_1 = __importDefault(require("../services/CartService"));
const CartResponse_1 = __importDefault(require("./responses/CartResponse"));
const DatabaseError_1 = __importDefault(require("../exception/DatabaseError"));
const ResourceHandler_1 = __importDefault(require("../exception/ResourceHandler"));
class CartController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { deviceId, quantity } = req.body;
                const device = yield DeviceService_1.default.get(deviceId);
                const deviceResponse = new DeviceModel_1.default(device);
                const { quantity: availableQuantity, price } = deviceResponse;
                if (quantity > availableQuantity) {
                    const errPayload = {
                        error: 'Out of stock',
                        message: 'Insufficient quantity - Quantity is greater than available stock quantity',
                    };
                    return ResourceHandler_1.default.badRequest(res, errPayload);
                }
                const totalPrice = price * quantity;
                const roundedPrice = Math.round(totalPrice * 100) / 100;
                const cartPayload = {
                    userId: req.user.id,
                    deviceId: deviceId,
                    quantity: quantity,
                    price: roundedPrice,
                    isActive: true
                };
                const cart = yield CartService_1.default.create(cartPayload);
                const cartResponse = new CartResponse_1.default(cart);
                return res.json(cartResponse.build());
            }
            catch (err) {
                if (err instanceof DatabaseError_1.default) {
                    return err.handle(res);
                }
                const errPayload = { error: 'Failed to create a cart', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
    static update(req, res) {
        try {
        }
        catch (err) {
            if (err instanceof DatabaseError_1.default) {
                return err.handle(res);
            }
            const errPayload = { error: 'Failed to update a cart', message: err.message };
            return ResourceHandler_1.default.badRequest(res, errPayload);
        }
    }
}
exports.default = CartController;
//# sourceMappingURL=CartController.js.map