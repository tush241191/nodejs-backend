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
const Log_1 = __importDefault(require("../middlewares/Log"));
const CartModel_1 = __importDefault(require("../models/CartModel"));
const DeviceModel_1 = __importDefault(require("../models/DeviceModel"));
const BaseService_1 = __importDefault(require("./BaseService"));
const DeviceService_1 = __importDefault(require("./DeviceService"));
const calculatePrice = (quantity, price) => {
    const totalPrice = price * quantity;
    return Math.round(totalPrice * 100) / 100;
};
class CartService extends BaseService_1.default {
    static create(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deviceId, quantity } = payload;
            const device = yield DeviceService_1.default.get(deviceId);
            const deviceResponse = new DeviceModel_1.default(device);
            const { quantity: availableQuantity, price } = deviceResponse;
            if (quantity > availableQuantity) {
                throw new DatabaseError_1.default('Out of stock');
            }
            const roundedPrice = calculatePrice(quantity, price);
            const cartPayload = {
                userId: userId,
                deviceId: deviceId,
                quantity: quantity,
                price: roundedPrice,
                isActive: true
            };
            try {
                const cart = yield CartModel_1.default.service.create({
                    data: cartPayload,
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
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield CartModel_1.default.service.findUniqueOrThrow({
                    where: { id },
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
    static list(userId, showAll = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartList = yield CartModel_1.default.service.findMany({
                    where: Object.assign({}, !showAll && {
                        userId: userId,
                        isActive: true,
                        deletedAt: null
                    }),
                    orderBy: { createdAt: 'desc' },
                    include: {
                        user: true,
                        device: true
                    }
                });
                return cartList.map((cart) => new CartModel_1.default(cart));
            }
            catch (err) {
                Log_1.default.error(`Error :: ${err}'`);
            }
        });
    }
    static update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { quantity } = payload;
            const cart = yield CartService.get(id);
            const cartResponse = new CartModel_1.default(cart);
            const device = yield DeviceService_1.default.get(cartResponse.device.id);
            const deviceResponse = new DeviceModel_1.default(device);
            const { quantity: availableQuantity, price } = deviceResponse;
            if (quantity > availableQuantity) {
                throw new DatabaseError_1.default('Out of stock');
            }
            const roundedPrice = calculatePrice(quantity, price);
            const cartPayload = {
                quantity: quantity,
                price: roundedPrice
            };
            try {
                const cart = yield CartModel_1.default.service.update({
                    where: { id },
                    data: cartPayload,
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
    static delete(id) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield _super.delete.call(this, {
                    service: CartModel_1.default.service,
                    id: id
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