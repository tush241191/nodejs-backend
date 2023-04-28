"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = __importDefault(require("../controllers/CartController"));
const create_1 = __importDefault(require("../schemas/cart/create"));
const Route_1 = __importDefault(require("../utils/Route"));
const Validate_1 = __importDefault(require("../middlewares/Validate"));
const cartRouter = (0, express_1.Router)();
const routePath = route => '/cart' + route;
cartRouter.post(routePath('/create/'), Route_1.default.setClientMiddleWares(), [Validate_1.default.requireSchema(create_1.default)], CartController_1.default.create);
exports.default = cartRouter;
//# sourceMappingURL=CartRouter.js.map