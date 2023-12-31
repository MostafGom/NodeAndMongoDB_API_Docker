"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
router.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/hello', (req, res) => {
    res.redirect('/');
});
exports.default = router;
