import { create } from '@wppconnect-team/wppconnect';
import { appWhatsapp } from './functionsWhatsApp';

// Tipagem para o objeto de resposta
interface ImageResponse {
    type: string;
    data: Buffer;
}

// Inicializando o wppconnect
create({
    session: 'sessionTeste',
    catchQR: (base64Qr: string, asciiQR: string) => {
        console.log(asciiQR); // Log do QR code no terminal (apenas no terminal)

        // Expressão regular para base64 (se quiser usar depois)
        const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid input string');
        }

        // Definindo o tipo da resposta (se precisar armazenar a imagem)
        const response: ImageResponse = {
            type: matches[1],
            data: Buffer.from(matches[2], 'base64'), // Buffer correto
        };

    },
    logQR: false, // Desativa o log gráfico do QR code
    puppeteerOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Argumentos recomendados para evitar problemas de permissões
        headless: true, // Executa o Chromium no modo headless
    }
})
    .then((client: any) => {
        console.log(client);
        appWhatsapp(client)
    }) // Passa o cliente para manipulação
    .catch((error: any) => console.log(error));

export default {}; // Exporta algo vazio caso necessário
