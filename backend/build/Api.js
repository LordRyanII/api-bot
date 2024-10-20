"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./Configs/Server/server");
const functionsWhatsApp_1 = require("./Configs/whatsConnect/functionsWhatsApp");
const wppconnect_1 = require("@wppconnect-team/wppconnect");
server_1.Server.listen(server_1.port, () => {
    console.log(`Server is running on port ${server_1.port}`);
    (0, wppconnect_1.create)({
        session: 'sessionTeste',
        catchQR: (base64Qr, asciiQR) => {
            console.log(asciiQR); // Log do QR code no terminal
            const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                throw new Error('Invalid input string');
            }
            const response = {
                type: matches[1],
                data: Buffer.from(matches[2], 'base64'), // Buffer correto
            };
            // Aqui você pode armazenar ou usar a resposta de alguma forma
        },
        logQR: true,
        puppeteerOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        }
    }).then((client) => {
        console.log(client);
        (0, functionsWhatsApp_1.appWhatsapp)(client);
    }).catch((error) => console.error('Error initializing WPPConnect:', error));
});
