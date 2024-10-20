"use strict";
// import { create } from '@wppconnect-team/wppconnect';
// import { appWhatsapp } from './functionsWhatsApp';
// // Tipagem para o objeto de resposta
// interface ImageResponse {
//     type: string;
//     data: Buffer;
// }
// // Inicializando o wppconnect
// create({
//     session: 'sessionTeste',
//     catchQR: (base64Qr: string, asciiQR: string) => {
//         console.log(asciiQR); // Log do QR code no terminal
//         const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
//         if (!matches || matches.length !== 3) {
//             throw new Error('Invalid input string');
//         }
//         const response: ImageResponse = {
//             type: matches[1],
//             data: Buffer.from(matches[2], 'base64'), // Buffer correto
//         };
//         // Aqui você pode armazenar ou usar a resposta de alguma forma
//     },
//     logQR: true,
//     puppeteerOptions: {
//         args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         headless: true,
//     }
// }).then((client: any) => {
//     console.log(client);
//     appWhatsapp(client);
// })
//     .catch((error: any) => console.error('Error initializing WPPConnect:', error));
// export default {}; // Mantenha ou remova conforme necessário
