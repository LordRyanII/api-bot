import { Server, port } from './Configs/Server/server';
import { appWhatsapp } from './Configs/whatsConnect/functionsWhatsApp';
import { ImageResponse } from './Configs/Interfaces/interfaces';
import { create, CreateOptions } from '@wppconnect-team/wppconnect';

// Definindo as opções de criação
const puppeteer = require('puppeteer-extra');

const createOptions: CreateOptions = {
    session: 'sessionTeste',
    catchQR: (base64Qr: string, asciiQR: string) => {
        console.log(asciiQR);

        const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid input string');
        }

        const response: ImageResponse = {
            type: matches[1],
            data: Buffer.from(matches[2], 'base64'),
        };

        // Armazene ou utilize a resposta aqui
    },
    logQR: true,
    puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
};

// Logando o caminho do executável antes de inicializar o Puppeteer
const executablePath = puppeteer.executablePath();
console.log(`Puppeteer is using executable path: ${executablePath}`);

Server.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    create(createOptions).then((client: any) => {
        console.log('WPPConnect client initialized successfully:', client);
        appWhatsapp(client);
    }).catch((error: unknown) => {
        console.error('Error initializing WPPConnect:', error);
    });
});
