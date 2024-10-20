"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTokenQrCode_1 = require("../Controllers/getTokenQrCode");
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.use((0, express_1.json)());
routes.get('/chatbot/gerarQrCode', getTokenQrCode_1.getQrCode);
exports.default = routes;
