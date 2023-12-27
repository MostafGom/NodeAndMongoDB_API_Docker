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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const logEvents_1 = require("../middleware/logEvents");
const connectToDB = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    // mongoose.connect('mongodb://root:example@mongodocker_container:27017/testdsdsd', {
    //     // useNewUrlParser: true,
    //     // useUnifiedTopology: true,
    //     authSource: 'admin', // Specify the authentication database
    //     authMechanism: 'DEFAULT',
    // }).then(mongoConn => {
    //     console.log(mongoConn);
    //     console.log('connected to db');
    //     callback(null, mongoConn)
    // }).catch(error => {
    //     console.error(error);
    //     logEvents(`${error.name}: ${error.message}`, 'errorlog.txt');
    //     callback(error, null)
    // })
    try {
        yield mongoose.connect('mongodb://root:example@mongodocker_container:27017/testdsdsd', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            authSource: 'admin', // Specify the authentication database
            authMechanism: 'DEFAULT',
        });
        console.log('connected to db');
        callback(null, mongoose);
    }
    catch (error) {
        console.error(error);
        (0, logEvents_1.logEvents)(`${error.name}: ${error.message}`, 'errorlog.txt');
        callback(error, null);
    }
});
exports.default = connectToDB;
