"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const Locals_1 = __importDefault(require("./Locals"));
const Log_1 = __importDefault(require("../middlewares/Log"));
const Routes_1 = __importDefault(require("./Routes"));
const Kernel_1 = __importDefault(require("../middlewares/Kernel"));
class Express {
    /**
    * Initializes the express server
    */
    constructor() {
        this.express = express.default();
        this.mountMiddlewares();
        this.mountRoutes();
    }
    /**
    * Mounts all the defined middlewares
    */
    mountMiddlewares() {
        this.express = Kernel_1.default.init(this.express);
    }
    /**
     * Mounts all the defined routes
     */
    mountRoutes() {
        this.express = Routes_1.default.mountUser(this.express);
        this.express = Routes_1.default.mountDevice(this.express);
        this.express = Routes_1.default.mountCart(this.express);
    }
    /**
    * Starts the express server
    */
    init() {
        const port = Locals_1.default.config().port;
        // @TODO
        //this.express = ExceptionHandler.notFoundHandler(this.express)
        this.express.listen(port, () => {
            return Log_1.default.info(`Server :: Running @ 'http://localhost:${port}'`);
        }).on('error', _error => {
            return Log_1.default.error(`Error :: ${_error.message}'`);
        });
    }
}
exports.default = new Express();
//# sourceMappingURL=Express.js.map