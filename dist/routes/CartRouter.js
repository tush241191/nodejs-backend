"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = __importDefault(require("../controllers/CartController"));
const create_1 = __importDefault(require("../schemas/cart/create"));
const update_1 = __importDefault(require("../schemas/cart/update"));
const Route_1 = __importDefault(require("../utils/Route"));
const Validate_1 = __importDefault(require("../middlewares/Validate"));
const IUser_1 = require("../interfaces/models/IUser");
const cartRouter = (0, express_1.Router)();
const routePath = route => '/cart' + route;
cartRouter.post(routePath('/create'), Route_1.default.setClientMiddleWares(), [Validate_1.default.requireSchema(create_1.default)], CartController_1.default.create);
cartRouter.get(routePath('/list'), Route_1.default.setMultiRoleMiddlewares([IUser_1.UserRoles.ADMIN, IUser_1.UserRoles.CLIENT]), CartController_1.default.list);
cartRouter.patch(routePath('/:id'), Route_1.default.setClientMiddleWares(), [Validate_1.default.requireSchema(update_1.default)], CartController_1.default.update);
cartRouter.delete(routePath('/:id'), Route_1.default.setClientMiddleWares(), CartController_1.default.delete);
exports.default = cartRouter;
//# sourceMappingURL=CartRouter.js.map