"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appWhatsapp = void 0;
const builder_1 = __importDefault(require("../../Services/Builder/builder"));
const appWhatsapp = (client) => {
    const blocos = new builder_1.default(client);
    blocos.flow();
};
exports.appWhatsapp = appWhatsapp;
exports.default = exports.appWhatsapp;
