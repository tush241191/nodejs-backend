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
const DeviceModel_1 = __importDefault(require("../models/DeviceModel"));
const BaseService_1 = __importDefault(require("./BaseService"));
class DeviceService extends BaseService_1.default {
    static list() {
        const _super = Object.create(null, {
            list: { get: () => super.list }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deviceList = yield _super.list.call(this, {
                    service: DeviceModel_1.default.service,
                    include: {
                        category: true,
                        brand: true,
                    }
                });
                return deviceList.map((device) => new DeviceModel_1.default(device));
            }
            catch (err) {
                Log_1.default.error(`Error :: ${err}'`);
            }
            return []; // Default return value
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const device = yield DeviceModel_1.default.service.findUniqueOrThrow({
                    where: { id },
                    include: {
                        category: true,
                        brand: true,
                    }
                });
                return new DeviceModel_1.default(device);
            }
            catch (err) {
                throw new DatabaseError_1.default(err);
            }
        });
    }
}
exports.default = DeviceService;
//# sourceMappingURL=DeviceService.js.map