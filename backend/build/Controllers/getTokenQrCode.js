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
exports.getQrCode = void 0;
const wppconnect_1 = require("@wppconnect-team/wppconnect");
const functionsWhatsApp_1 = require("../Configs/whatsConnect/functionsWhatsApp");
const getQrCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Cria a sessão do WhatsApp com o Puppeteer configurado
        (0, wppconnect_1.create)({
            session: 'sessionTeste',
            catchQR: (base64Qr, asciiQR) => {
                console.log(asciiQR); // Exibe o QR code ASCII no terminal
                // Se o usuário não estiver logado, envia o QR code em base64 para o cliente
                res.status(200).json({
                    "status": "ok",
                    "message": "QR code gerado com sucesso",
                    "qrCode": base64Qr // Envia o QR code em base64
                });
            },
            logQR: false, // Desativa o log gráfico do QR code
            // Adicionando opções para o Puppeteer
            puppeteerOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // Argumentos recomendados para evitar problemas de permissões
                headless: true, // Executa o Chromium no modo headless
            }
        }).then((client) => __awaiter(void 0, void 0, void 0, function* () {
            // Verifica se o cliente já está conectado
            const isConnected = yield client.isConnected();
            if (isConnected) {
                // Se o cliente já está conectado, retorna essa informação
                res.status(200).json({
                    "status": "ok",
                    "message": "Cliente já está conectado"
                });
                (0, functionsWhatsApp_1.appWhatsapp)(client);
            }
            else {
                console.log("Cliente não conectado, QR code gerado.");
            }
        })).catch((error) => {
            console.log(error);
            res.status(404).json({
                "status": "error",
                "message": "Erro ao verificar a conexão do cliente",
            });
        });
    }
    catch (error) {
        res.status(500).json({
            "status": "error",
            "message": "Erro na solicitação ao servidor",
        });
    }
});
exports.getQrCode = getQrCode;
