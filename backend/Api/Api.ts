import { Server, port } from './Configs/Server/server';
import { appWhatsapp } from './Configs/whatsConnect/functionsWhatsApp';
import { ImageResponse } from './Configs/Interfaces/interfaces';
import { create, CreateOptions } from '@wppconnect-team/wppconnect';
import puppeteer, { Browser } from 'puppeteer'; // Importando Browser de puppeteer
import fs from 'fs';
import path from 'path';

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
    },
    logQR: true,
    puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '' // Inicialmente vazio
    }
};

// Função para forçar a instalação do Chrome
async function installChrome(): Promise<void> {
    const puppeteer = require('puppeteer-extra');
    await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    console.log('Instalação do Chrome concluída.');
}

// Função para obter o caminho do executável do Chrome
async function getChromeExecutablePath(): Promise<string> {
    let browser: Browser | null = null;

    try {
        // Tente instalar o Chrome antes de obter o caminho
        await installChrome();

        // Inicia o Puppeteer para obter o caminho do Chrome
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const executablePath = browser.process()?.spawnfile; // Obtém o caminho do Chrome

        if (!executablePath) {
            throw new Error('O caminho do executável do Chrome não foi encontrado.');
        }

        console.log(`Caminho do executável encontrado: ${executablePath}`);
        return executablePath;
    } catch (error) {
        console.error('Erro ao obter o caminho do Chrome:', error);
        throw error; // Lança o erro para tratamento
    } finally {
        // Garante que o navegador seja fechado se foi aberto
        if (browser) {
            await browser.close();
        }
    }
}

// Definindo o caminho do Chrome de forma assíncrona
getChromeExecutablePath().then(executablePath => {
    // Certificando-se de que puppeteerOptions está definido
    if (createOptions.puppeteerOptions) {
        createOptions.puppeteerOptions.executablePath = executablePath;

        // Log do diretório do Chrome
        const chromeDir = path.dirname(executablePath);
        logChromeDirectory(chromeDir);

        // Iniciando o servidor
        Server.listen(port, () => {
            console.log(`Server is running on port ${port}`);

            create(createOptions).then((client: any) => {
                console.log('WPPConnect client initialized successfully:', client);
                appWhatsapp(client);
            }).catch((error: unknown) => {
                console.error('Error initializing WPPConnect:', error);
            });
        });
    } else {
        console.error('puppeteerOptions is not defined.');
    }
}).catch(error => {
    console.error('Erro ao obter o caminho do Chrome:', error);
});
