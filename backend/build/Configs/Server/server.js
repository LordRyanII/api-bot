"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.port = void 0;
const express_1 = __importDefault(require("express"));
// import routes from '../../Routers/router';
const port = process.env.PORT || 3005;
exports.port = port;
const Server = (0, express_1.default)();
exports.Server = Server;
