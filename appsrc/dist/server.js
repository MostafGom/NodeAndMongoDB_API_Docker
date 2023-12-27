"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const logEvents_1 = require("./middleware/logEvents");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const connectToDB_1 = __importDefault(require("./db/connectToDB"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/routeTemp', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(logEvents_1.logger);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use('/', routes_1.default.rootRoute);
app.use('/register', routes_1.default.registerRoute);
app.use('/auth', routes_1.default.authRoute);
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path_1.default.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    }
});
app.use(errorHandler_1.default);
(0, connectToDB_1.default)((error) => {
    if (error) {
        console.error(error);
        http_errors_1.default.InternalServerError('Failed To Connect');
        // res.json({ error: '404 Not Found' })
    }
    else {
        app.listen(PORT, function () {
            console.log('Server listening on port ' + PORT);
        });
    }
});
