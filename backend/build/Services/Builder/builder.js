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
const contentMessages_1 = require("./Flows/Messages/contentMessages");
const userState = {};
class Builder {
    constructor(Client) {
        this.Client = Client;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    flow() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Client.onMessage((message) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const userId = message.from;
                    if (!message.body) {
                        yield this.Client.sendText(userId, 'Mensagem inválida. Por favor, tente novamente.');
                        return;
                    }
                    const userResponse = message.body.trim();
                    const userName = message.sender.name || message.sender.pushname;
                    if (!userState[userId]) {
                        userState[userId] = 'saudacao';
                        yield this.saudacao(userId, userName);
                    }
                    if (userState[userId] === 'mainMenu') {
                        yield this.menuOpcoes(userId, userResponse);
                    }
                    if (userState[userId] === 'menuServicos') {
                        yield this.optionServicos(userId, userResponse);
                    }
                }
                catch (error) {
                    console.log('Erro no fluxo principal: ', error);
                }
            }));
        });
    }
    // Saudação inicial
    saudacao(userId, userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userState[userId] === 'saudacao' || userState[userId] === '') {
                    const msgSaudacao = contentMessages_1.initialFlow.inicial.replace('$', userName);
                    yield this.Client.sendText(userId, msgSaudacao);
                    userState[userId] = 'mainMenu';
                    yield this.delay(3000); // Adiciona atraso de 3ms
                    yield this.Client.sendText(userId, contentMessages_1.menuPrincipal.Options);
                }
            }
            catch (error) {
                console.error('Erro na função saudacao: ', error);
            }
        });
    }
    // Exibe o menu de opções e processa a resposta do usuário
    menuOpcoes(userId, userResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (userResponse) {
                    case '1':
                        yield this.Client.sendText(userId, 'Você escolheu falar sobre horários');
                        yield this.delay(2000); // Adiciona atraso de 2 segundos
                        yield this.optionHorarios(userId);
                        break;
                    case '2':
                        yield this.Client.sendText(userId, 'Você escolheu falar sobre agenda');
                        yield this.delay(2000);
                        yield this.optionAgenda(userId);
                        break;
                    case '3':
                        yield this.Client.sendText(userId, 'Você escolheu falar com um atendente!');
                        yield this.delay(2000);
                        yield this.optionAtendimento(userId);
                        break;
                    case '4':
                        yield this.Client.sendText(userId, 'Você escolheu falar sobre serviços!');
                        yield this.delay(2000);
                        yield this.Client.sendText(userId, contentMessages_1.menuServicos.Options); // Mostra o menu de serviços
                        userState[userId] = 'menuServicos'; // Atualiza o estado do usuário
                        break;
                }
            }
            catch (error) {
                console.error('Erro na função menuOpcoes: ', error);
            }
        });
    }
    // Funções para cada opção do menu
    optionHorarios(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Client.sendText(userId, contentMessages_1.menuHorarios.info);
                userState[userId] = "";
            }
            catch (error) {
                console.error('Erro na função optionHorarios: ', error);
            }
        });
    }
    optionAgenda(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Client.sendText(userId, contentMessages_1.menuAgenda.info);
                userState[userId] = '';
            }
            catch (error) {
                console.error('Erro na função optionAgenda: ', error);
            }
        });
    }
    optionAtendimento(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Client.sendText(userId, contentMessages_1.atendimentoHumano.info);
                userState[userId] = '';
            }
            catch (error) {
                console.error('Erro na função optionAtendimento: ', error);
            }
        });
    }
    optionServicos(userId, userResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Usuário respondeu: ${userResponse}`); // Adicionando log para verificar a resposta
                switch (userResponse) {
                    case '1':
                        console.log('Usuário escolheu Cortes masculinos');
                        yield this.Client.sendText(userId, contentMessages_1.menuCortesMasculinos.info);
                        yield this.Client.sendImage(userId, contentMessages_1.imagemCorteMasculinosMullet.image, contentMessages_1.imagemCorteMasculinosMullet.title, contentMessages_1.imagemCorteMasculinosMullet.text);
                        yield this.Client.sendImage(userId, contentMessages_1.imagemCorteMasculinosTopete.image, contentMessages_1.imagemCorteMasculinosTopete.title, contentMessages_1.imagemCorteMasculinosTopete.text);
                        break;
                    case '2':
                        console.log('Usuário escolheu Sobrancelhas');
                        yield this.Client.sendText(userId, contentMessages_1.menuCortesSombrancelhas.info);
                        break;
                    case '3':
                        console.log('Usuário escolheu Unhas');
                        yield this.Client.sendText(userId, contentMessages_1.menuUnhas.info);
                        break;
                }
                // Após a escolha de uma opção de serviço, reapresenta o menu de serviços
                yield this.delay(3000);
                yield this.Client.sendText(userId, contentMessages_1.menuServicos.Options);
                // Atualiza o estado para manter o usuário no menu de serviços
                yield this.delay(3000);
                userState[userId] = 'menuServicos';
            }
            catch (error) {
                console.error('Erro na função optionServicos: ', error);
            }
        });
    }
}
exports.default = Builder;
