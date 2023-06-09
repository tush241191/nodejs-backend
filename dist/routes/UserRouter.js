"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const Validate_1 = __importDefault(require("../middlewares/Validate"));
const create_1 = __importDefault(require("../schemas/user/create"));
const login_1 = __importDefault(require("../schemas/user/login"));
const Route_1 = __importDefault(require("../utils/Route"));
const Auth_1 = __importDefault(require("../middlewares/Auth"));
const userRouter = (0, express_1.Router)();
const routePath = route => '/user' + route;
userRouter.post(routePath('/create'), Route_1.default.setAdminMiddleWares([Validate_1.default.requireSchema(create_1.default)]), UserController_1.default.create);
userRouter.post(routePath('/login'), [Validate_1.default.requireSchema(login_1.default)], UserController_1.default.login);
userRouter.get(routePath('/list'), Route_1.default.setAdminMiddleWares(), UserController_1.default.list);
userRouter.get(routePath('/validate'), [Auth_1.default.requireJwt], UserController_1.default.validate);
exports.default = userRouter;
//# sourceMappingURL=UserRouter.js.map