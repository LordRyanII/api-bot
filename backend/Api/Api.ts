import { Server, port } from './Configs/Server/server';
import appWhatsapp from './Configs/whatsConnect/functionsWhatsApp';

Server.listen(port, () => {
    appWhatsapp;
    console.log(`Server is running on port ${port}`);
});
