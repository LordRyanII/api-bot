import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { userState } from "../../Configs/Interfaces/interfaces";
import {
    initialFlow,
    menuPrincipal,
    menuHorarios,
    menuAgenda,
    atendimentoHumano,
    menuServicos,
    menuCortesMasculinos,
    menuCortesSombrancelhas,
    menuUnhas,
    imagemCorteMasculinosMullet,
    imagemCorteMasculinosTopete
} from "./Flows/Messages/contentMessages";

const userState: userState = {};

class Builder {
    constructor(private Client: any) { }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async flow(): Promise<void> {
        this.Client.onMessage(async (message: Message) => {
            try {
                const userId = message.from;

                if (!message.body) {
                    await this.Client.sendText(userId, 'Mensagem inválida. Por favor, tente novamente.');
                    return;
                }

                const userResponse: string = message.body.trim();
                const userName = message.sender.name || message.sender.pushname;

                if (!userState[userId]) {
                    userState[userId] = 'saudacao';
                    await this.saudacao(userId, userName);
                } if (userState[userId] === 'mainMenu') {

                    await this.menuOpcoes(userId, userResponse);
                }
                if (userState[userId] === 'menuServicos') {
                    await this.optionServicos(userId, userResponse);
                }
            } catch (error) {
                console.log('Erro no fluxo principal: ', error);
            }
        });
    }

    // Saudação inicial
    public async saudacao(userId: string, userName: string | any): Promise<void> {
        try {
            if (userState[userId] === 'saudacao' || userState[userId] === '') {

                const msgSaudacao = initialFlow.inicial.replace('$', userName);
                await this.Client.sendText(userId, msgSaudacao);
                userState[userId] = 'mainMenu';
                await this.delay(3000); // Adiciona atraso de 3ms
                await this.Client.sendText(userId, menuPrincipal.Options);
            }
        } catch (error) {
            console.error('Erro na função saudacao: ', error);
        }
    }

    // Exibe o menu de opções e processa a resposta do usuário
    public async menuOpcoes(userId: string, userResponse: string): Promise<void> {
        try {
            switch (userResponse) {
                case '1':
                    await this.Client.sendText(userId, 'Você escolheu falar sobre horários');
                    await this.delay(2000); // Adiciona atraso de 2 segundos
                    await this.optionHorarios(userId);
                    break;
                case '2':
                    await this.Client.sendText(userId, 'Você escolheu falar sobre agenda');
                    await this.delay(2000);
                    await this.optionAgenda(userId);
                    break;
                case '3':
                    await this.Client.sendText(userId, 'Você escolheu falar com um atendente!');
                    await this.delay(2000);
                    await this.optionAtendimento(userId);
                    break;
                case '4':
                    await this.Client.sendText(userId, 'Você escolheu falar sobre serviços!');
                    await this.delay(2000);
                    await this.Client.sendText(userId, menuServicos.Options);  // Mostra o menu de serviços
                    userState[userId] = 'menuServicos';  // Atualiza o estado do usuário
                    break;
            }
        } catch (error) {
            console.error('Erro na função menuOpcoes: ', error);
        }
    }

    // Funções para cada opção do menu
    private async optionHorarios(userId: string): Promise<void> {
        try {
            await this.Client.sendText(userId, menuHorarios.info);
            userState[userId] = "";
        } catch (error: Error | any) {
            console.error('Erro na função optionHorarios: ', error);
        }
    }

    private async optionAgenda(userId: string): Promise<void> {
        try {
            await this.Client.sendText(userId, menuAgenda.info);
            userState[userId] = '';
        } catch (error: Error | any) {
            console.error('Erro na função optionAgenda: ', error);
        }
    }

    private async optionAtendimento(userId: string): Promise<void> {
        try {
            await this.Client.sendText(userId, atendimentoHumano.info);
            userState[userId] = '';
        } catch (error: Error | any) {
            console.error('Erro na função optionAtendimento: ', error);
        }
    }

    private async optionServicos(userId: string, userResponse: string): Promise<void> {
        try {
            console.log(`Usuário respondeu: ${userResponse}`); // Adicionando log para verificar a resposta

            switch (userResponse) {
                case '1':
                    console.log('Usuário escolheu Cortes masculinos');
                    await this.Client.sendText(userId, menuCortesMasculinos.info);
                    await this.Client.sendImage(userId, imagemCorteMasculinosMullet.image, imagemCorteMasculinosMullet.title, imagemCorteMasculinosMullet.text);
                    await this.Client.sendImage(userId, imagemCorteMasculinosTopete.image, imagemCorteMasculinosTopete.title, imagemCorteMasculinosTopete.text);
                    break;
                case '2':
                    console.log('Usuário escolheu Sobrancelhas');
                    await this.Client.sendText(userId, menuCortesSombrancelhas.info);
                    break;
                case '3':
                    console.log('Usuário escolheu Unhas');
                    await this.Client.sendText(userId, menuUnhas.info);
                    break;
            }

            // Após a escolha de uma opção de serviço, reapresenta o menu de serviços
            await this.delay(3000);
            await this.Client.sendText(userId, menuServicos.Options);

            // Atualiza o estado para manter o usuário no menu de serviços
            await this.delay(3000);
            userState[userId] = 'menuServicos';

        } catch (error: Error | any) {
            console.error('Erro na função optionServicos: ', error);
        }
    }
}

export default Builder;