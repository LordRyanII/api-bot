"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./Configs/Server/server");
const functionsWhatsApp_1 = require("./Configs/whatsConnect/functionsWhatsApp");
const wppconnect_1 = require("@wppconnect-team/wppconnect");
// Definindo as opções de criação
const puppeteer = require('puppeteer-extra');
const createOptions = {
    session: 'sessionTeste',
    catchQR: (base64Qr, asciiQR) => {
        console.log(asciiQR);
        const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid input string');
        }
        const response = {
            type: matches[1],
            data: Buffer.from(matches[2], 'base64'),
        };
        // Armazene ou utilize a resposta aqui
    },
    logQR: true,
    puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/opt/render/.cache/puppeteer/chrome/linux-130.0.6723.58/chrome-linux64/chrome' // Caminho fixo do Chrome/Chromium
    }
};
// Verificando se o caminho do Chrome/Chromium está correto
console.log(`Usando o caminho do executável: ${puppeteer.executablePath()}`);
server_1.Server.listen(server_1.port, () => {
    console.log(`Server is running on port ${server_1.port}`);
    (0, wppconnect_1.create)(createOptions).then((client) => {
        console.log('WPPConnect client initialized successfully:', client);
        (0, functionsWhatsApp_1.appWhatsapp)(client);
    }).catch((error) => {
        console.error('Error initializing WPPConnect:', error);
    });
});
