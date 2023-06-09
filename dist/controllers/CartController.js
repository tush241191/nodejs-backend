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
const CartService_1 = __importDefault(require("../services/CartService"));
const CartResponse_1 = __importDefault(require("./responses/CartResponse"));
const DatabaseError_1 = __importDefault(require("../exception/DatabaseError"));
const ResourceHandler_1 = __importDefault(require("../exception/ResourceHandler"));
const IUser_1 = require("../interfaces/models/IUser");
class CartController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield CartService_1.default.create(req.user.id, req.body);
                const cartResponse = new CartResponse_1.default(cart);
                cartResponse.includeUser = req.user.role === IUser_1.UserRoles.ADMIN;
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
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isAdmin = req.user.role === IUser_1.UserRoles.ADMIN;
                const cartList = yield CartService_1.default.list(req.user.id, isAdmin);
                const response = cartList.map(cart => {
                    const resp = new CartResponse_1.default(cart);
                    resp.includeUser = isAdmin;
                    return resp.build();
                });
                res.json(response);
            }
            catch (err) {
                if (err instanceof DatabaseError_1.default) {
                    return err.handle(res);
                }
                const errPayload = { error: 'Failed to list cart', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield CartService_1.default.update(req.params.id, req.body);
                const cartResponse = new CartResponse_1.default(cart);
                cartResponse.includeUser = req.user.role === IUser_1.UserRoles.ADMIN;
                return res.json(cartResponse.build());
            }
            catch (err) {
                if (err instanceof DatabaseError_1.default) {
                    return err.handle(res);
                }
                const errPayload = { error: 'Failed to update a cart', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield CartService_1.default.delete(req.params.id);
                return res
                    .status(200)
                    .send();
            }
            catch (err) {
                if (err instanceof DatabaseError_1.default) {
                    return err.handle(res);
                }
                const errPayload = { error: 'Failed to delete a cart', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
}
exports.default = CartController;
//# sourceMappingURL=CartController.js.map