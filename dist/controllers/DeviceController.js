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
const ResourceHandler_1 = __importDefault(require("../exception/ResourceHandler"));
const DeviceService_1 = __importDefault(require("../services/DeviceService"));
const DeviceResponse_1 = __importDefault(require("./responses/DeviceResponse"));
const DatabaseError_1 = __importDefault(require("../exception/DatabaseError"));
class DeviceController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deviceList = yield DeviceService_1.default.list();
                const response = deviceList.map(device => {
                    const resp = new DeviceResponse_1.default(device);
                    return resp.build();
                });
                res.json(response);
            }
            catch (err) {
                const errPayload = { error: 'Failed to fetch device list', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
    static read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const device = yield DeviceService_1.default.get(req.params.id);
                const deviceResponse = new DeviceResponse_1.default(device);
                res.json(deviceResponse.build());
            }
            catch (err) {
                if (err instanceof DatabaseError_1.default) {
                    return err.handle(res);
                }
                const errPayload = { error: 'Failed to fetch device', message: err.message };
                return ResourceHandler_1.default.badRequest(res, errPayload);
            }
        });
    }
}
exports.default = DeviceController;
//# sourceMappingURL=DeviceController.js.map