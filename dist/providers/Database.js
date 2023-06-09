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
exports.Database = void 0;
const client_1 = __importDefault(require("@prisma/client"));
const Log_1 = __importDefault(require("../middlewares/Log"));
class Database {
    constructor() {
        this.client = this.setClient();
        this.connect().then();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            Log_1.default.info('DATABASE :: Trying to connect');
            try {
                yield this.client.$connect();
                Log_1.default.info('DATABASE :: Connected to the database');
            }
            catch (error) {
                Log_1.default.info('DATABASE :: Failed to connect to the database');
            }
        });
    }
    /**
     * PrismaClient is not available when testing
     */
    setClient() {
        const { PrismaClient } = client_1.default || {};
        return PrismaClient ? new PrismaClient() : {};
    }
}
exports.Database = Database;
exports.default = new Database;
//# sourceMappingURL=Database.js.map