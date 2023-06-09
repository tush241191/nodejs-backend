"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const request_ip_1 = __importDefault(require("request-ip"));
const Log_1 = __importDefault(require("./Log"));
class Http {
    static mount(_express) {
        Log_1.default.info('Booting the \'HTTP\' middleware...');
        _express.disable('x-powered-by');
        _express.enable('json spaces');
        _express.enable('strict routing');
        _express.use((req, res, next) => {
            express_1.default.json()(req, res, next);
        });
        _express.use((0, cors_1.default)({
            exposedHeaders: [
                'Content-Type',
                'Content-Length',
                'Content-Disposition'
            ]
        }));
        _express.use(request_ip_1.default.mw());
        _express.use(express_useragent_1.default.express());
        return _express;
    }
}
exports.default = Http;
//# sourceMappingURL=Http.js.map