"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Database_1 = __importDefault(require("../providers/Database"));
const BaseModel_1 = __importDefault(require("./BaseModel"));
class Device extends BaseModel_1.default {
    constructor(device) {
        super();
        this.assignEntity(device);
    }
}
Device.service = Database_1.default.client.device;
Device.tableName = client_1.Prisma.ModelName.Device;
exports.default = Device;
//# sourceMappingURL=DeviceModel.js.map