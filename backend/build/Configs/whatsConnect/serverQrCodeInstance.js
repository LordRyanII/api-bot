"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wppconnect_1 = require("@wppconnect-team/wppconnect");
const functionsWhatsApp_1 = require("./functionsWhatsApp");
// Inicializando o wppconnect
(0, wppconnect_1.create)({
    session: 'sessionTeste',
    catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR); // Log do QR code no terminal (apenas no terminal)
        // Expressão regular para base64 (se quiser usar depois)
        const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid input string');
        }
        // Definindo o tipo da resposta (se precisar armazenar a imagem)
        const response = {
            type: matches[1],
            data: Buffer.from(matches[2], 'base64'), // Buffer correto
        };
    },
    logQR: false, // Desativa o log gráfico do QR code
    puppeteerOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Argumentos recomendados para evitar problemas de permissões
        headless: true, // Executa o Chromium no modo headless
    }
}).then((client) => {
    console.log(client);
    (0, functionsWhatsApp_1.appWhatsapp)(client);
}) // Passa o cliente para manipulação
    .catch((error) => console.log(error));
exports.default = {}; // Exporta algo vazio caso necessário
