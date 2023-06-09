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
const merge_js_1 = __importDefault(require("lodash/merge.js"));
const Log_1 = __importDefault(require("../middlewares/Log"));
class BaseService {
    static list({ service, query = {}, include = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseListQuery = {
                    where: { deletedAt: null },
                    include: include
                };
                const listQuery = (0, merge_js_1.default)(baseListQuery, query);
                return yield service.findMany(listQuery);
            }
            catch (err) {
                Log_1.default.error(`Error :: ${err}'`);
            }
        });
    }
    static delete({ service, id, query = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseDeleteQuery = {
                    where: { id },
                    data: {
                        isActive: false,
                        deletedAt: new Date()
                    }
                };
                const deleteQuery = (0, merge_js_1.default)(baseDeleteQuery, query);
                return yield service.update(deleteQuery);
            }
            catch (err) {
                Log_1.default.error(`Error :: ${err}'`);
            }
        });
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map