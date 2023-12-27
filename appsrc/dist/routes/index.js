"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = __importDefault(require("./root"));
const auth_1 = __importDefault(require("./auth"));
const register_1 = __importDefault(require("./register"));
exports.default = {
    rootRoute: root_1.default,
    authRoute: auth_1.default,
    registerRoute: register_1.default,
};
