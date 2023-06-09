"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DeviceController_1 = __importDefault(require("../controllers/DeviceController"));
const deviceRouter = (0, express_1.Router)();
const routePath = route => '/device' + route;
deviceRouter.get(routePath('/list'), DeviceController_1.default.list);
deviceRouter.get(routePath('/:id'), DeviceController_1.default.read);
exports.default = deviceRouter;
//# sourceMappingURL=DeviceRouter.js.map