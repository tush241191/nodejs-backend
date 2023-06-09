"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("../middlewares/Log"));
const Locals_1 = __importDefault(require("./Locals"));
const UserRouter_1 = __importDefault(require("../routes/UserRouter"));
const CartRouter_1 = __importDefault(require("../routes/CartRouter"));
const DeviceRouter_1 = __importDefault(require("../routes/DeviceRouter"));
class Routes {
    getPrefixRootRoute() {
        const apiPrefix = Locals_1.default.config().apiPrefix;
        return `/${apiPrefix}`;
    }
    mountUser(_express) {
        Log_1.default.info('Routes :: Mounting User Routes...');
        return _express.use(this.getPrefixRootRoute(), UserRouter_1.default);
    }
    mountDevice(_express) {
        Log_1.default.info('Routes :: Mounting Device Routes...');
        return _express.use(this.getPrefixRootRoute(), DeviceRouter_1.default);
    }
    mountCart(_express) {
        Log_1.default.info('Routes :: Mounting Cart Routes...');
        return _express.use(this.getPrefixRootRoute(), CartRouter_1.default);
    }
}
exports.default = new Routes;
//# sourceMappingURL=Routes.js.map