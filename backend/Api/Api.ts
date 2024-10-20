import { Server, port } from './Configs/Server/server';
import { appWhatsapp } from './Configs/whatsConnect/functionsWhatsApp';
import { ImageResponse } from './Configs/Interfaces/interfaces';
import { create, CreateOptions } from '@wppconnect-team/wppconnect';
import puppeteer from 'puppeteer-extra';
import fs from 'fs';
import path from 'path';

// Definindo o caminho do Chrome
const chromePath = '/opt/render/.cache/puppeteer/chrome/linux-130.0.6723.58/chrome-linux64/chrome';

// Função para logar o conteúdo do diretório do Chrome
function logChromeDirectory(directoryPath: string) {
    console.log(`Listando arquivos no diretório: ${directoryPath}`);
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Erro ao listar o diretório ${directoryPath}:`, err);
            return;
        }
        console.log(`Conteúdo do diretório ${directoryPath}:`);
        files.forEach(file => {
            console.log(file);
        });
    });
}

// Verificando o diretório onde o Chrome está localizado
logChromeDirectory(path.dirname(chromePath));

// Definindo as opções de criação
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
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Argumentos para evitar problemas em ambientes restritos
        executablePath: chromePath // Caminho fixo do Chrome/Chromium
    }
};

// Verificando se o caminho do Chrome/Chromium está correto
if (createOptions.puppeteerOptions) {
    console.log(`Usando o caminho do executável: ${createOptions.puppeteerOptions.executablePath}`);
} else {
    console.error('puppeteerOptions não está definido.');
}

Server.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    create(createOptions).then((client: any) => {
        console.log('WPPConnect client initialized successfully:', client);
        appWhatsapp(client);
    }).catch((error: unknown) => {
        console.error('Error initializing WPPConnect:', error);
    });
});
