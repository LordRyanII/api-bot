"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./Configs/Server/server");
const functionsWhatsApp_1 = __importDefault(require("./Configs/whatsConnect/functionsWhatsApp"));
server_1.Server.listen(server_1.port, () => {
    functionsWhatsApp_1.default;
    console.log(`Server is running on port ${server_1.port}`);
});
