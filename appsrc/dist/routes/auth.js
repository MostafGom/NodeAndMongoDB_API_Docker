"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verifyTokens_1 = require("../middleware/verifyTokens");
const authController_1 = __importDefault(require("../controllers/authController"));
router.post('/', authController_1.default.handleLogin);
router.get('/refresh', verifyTokens_1.verifyRefreshToken, authController_1.default.handleRefreshToken);
exports.default = router;
