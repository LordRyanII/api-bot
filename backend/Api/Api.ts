import { Server, port } from './Configs/Server/server';
import { appWhatsapp } from './Configs/whatsConnect/functionsWhatsApp';
import { ImageResponse } from './Configs/Interfaces/interfaces';
import { create, CreateOptions } from '@wppconnect-team/wppconnect';

// Definindo as opções de criação
const createOptions: CreateOptions = {
    session: 'sessionTeste',
    catchQR: (base64Qr: string, asciiQR: string) => {
        console.log(asciiQR); // Log do QR code no terminal

        const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid input string');
        }

        const response: ImageResponse = {
            type: matches[1],
            data: Buffer.from(matches[2], 'base64'), // Buffer correto
        };

        // Aqui você pode armazenar ou usar a resposta de alguma forma
    },
    logQR: true,
    puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // O executablePath é opcional, comente ou remova se o Puppeteer fizer o download automático
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
    }
};

Server.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    create(createOptions).then((client: any) => {
        console.log('WPPConnect client initialized successfully:', client);
        appWhatsapp(client);
    }).catch((error: any) => {
        console.error('Error initializing WPPConnect:', error);
    });
});
