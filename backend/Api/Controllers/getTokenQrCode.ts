import { Request, Response } from 'express';
import { create } from '@wppconnect-team/wppconnect';
import { appWhatsapp } from '../Configs/whatsConnect/functionsWhatsApp';

export const getQrCode = async (req: Request, res: Response) => {
    try {
        // Cria a sessão do WhatsApp
        create({
            session: 'sessionTeste',
            catchQR: (base64Qr: string, asciiQR: string) => {
                console.log(asciiQR); // Exibe o QR code ASCII no terminal

                // Se o usuário não estiver logado, envia o QR code em base64 para o cliente
                res.status(200).json({
                    "status": "ok",
                    "message": "QR code gerado com sucesso",
                    "qrCode": base64Qr // Envia o QR code em base64
                });

            },
            logQR: false, // Desativa o log gráfico do QR code
        }).then(async (client: any) => {
            // Verifica se o cliente já está conectado
            const isConnected = await client.isConnected();

            if (isConnected) {
                // Se o cliente já está conectado, retorna essa informação
                res.status(200).json({
                    "status": "ok",
                    "message": "Cliente já está conectado"
                });
                appWhatsapp(client);
            } else {
                console.log("Cliente não conectado, QR code gerado.");
            }

        })
            .catch((error: any) => {
                console.log(error);
                res.status(404).json({
                    "status": "error",
                    "message": "Erro ao verificar a conexão do cliente",
                });
            });
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": "Erro na solicitação ao servidor",
        });
    }
};
