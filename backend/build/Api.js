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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./Configs/Server/server");
const functionsWhatsApp_1 = require("./Configs/whatsConnect/functionsWhatsApp");
const wppconnect_1 = require("@wppconnect-team/wppconnect");
const puppeteer_1 = __importDefault(require("puppeteer")); // Importando Browser de puppeteer
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Função para logar o conteúdo do diretório do Chrome
function logChromeDirectory(directoryPath) {
    console.log(`Listando arquivos no diretório: ${directoryPath}`);
    fs_1.default.readdir(directoryPath, (err, files) => {
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
    },
    logQR: true,
    puppeteerOptions: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '' // Inicialmente vazio
    }
};
// Função para forçar a instalação do Chrome
function installChrome() {
    return __awaiter(this, void 0, void 0, function* () {
        const puppeteer = require('puppeteer-extra');
        yield puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        console.log('Instalação do Chrome concluída.');
    });
}
// Função para obter o caminho do executável do Chrome
function getChromeExecutablePath() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let browser = null;
        try {
            // Tente instalar o Chrome antes de obter o caminho
            yield installChrome();
            // Inicia o Puppeteer para obter o caminho do Chrome
            browser = yield puppeteer_1.default.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const executablePath = (_a = browser.process()) === null || _a === void 0 ? void 0 : _a.spawnfile; // Obtém o caminho do Chrome
            if (!executablePath) {
                throw new Error('O caminho do executável do Chrome não foi encontrado.');
            }
            console.log(`Caminho do executável encontrado: ${executablePath}`);
            return executablePath;
        }
        catch (error) {
            console.error('Erro ao obter o caminho do Chrome:', error);
            throw error; // Lança o erro para tratamento
        }
        finally {
            // Garante que o navegador seja fechado se foi aberto
            if (browser) {
                yield browser.close();
            }
        }
    });
}
// Definindo o caminho do Chrome de forma assíncrona
getChromeExecutablePath().then(executablePath => {
    // Certificando-se de que puppeteerOptions está definido
    if (createOptions.puppeteerOptions) {
        createOptions.puppeteerOptions.executablePath = executablePath;
        // Log do diretório do Chrome
        const chromeDir = path_1.default.dirname(executablePath);
        logChromeDirectory(chromeDir);
        // Iniciando o servidor
        server_1.Server.listen(server_1.port, () => {
            console.log(`Server is running on port ${server_1.port}`);
            (0, wppconnect_1.create)(createOptions).then((client) => {
                console.log('WPPConnect client initialized successfully:', client);
                (0, functionsWhatsApp_1.appWhatsapp)(client);
            }).catch((error) => {
                console.error('Error initializing WPPConnect:', error);
            });
        });
    }
    else {
        console.error('puppeteerOptions is not defined.');
    }
}).catch(error => {
    console.error('Erro ao obter o caminho do Chrome:', error);
});
