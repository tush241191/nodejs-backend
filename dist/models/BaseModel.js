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
const merge_1 = __importDefault(require("lodash/merge"));
const Log_1 = __importDefault(require("../middlewares/Log"));
class BaseModel {
    assignEntity(entity) {
        Object.assign(this, entity);
    }
    static getModelRecord({ model, where, include = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entry = yield model.service.findUniqueOrThrow({ where, include });
                return new model(entry);
            }
            catch (err) {
                Log_1.default.error(`Error :: ${err}'`);
            }
        });
    }
    static listModelRecords({ model, where = {}, include = null, orderBy = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findWhere = 'deletedAt' in model ? (0, merge_1.default)({ deletedAt: null }, where) : where;
                const list = yield model.service.findMany(Object.assign(Object.assign({ where: findWhere }, include && { include }), orderBy && { orderBy }));
                return list.map((row) => new model(row));
            }
            catch (err) {
                Log_1.default.error(`Error :: ${err}'`);
            }
        });
    }
}
exports.default = BaseModel;
//# sourceMappingURL=BaseModel.js.map