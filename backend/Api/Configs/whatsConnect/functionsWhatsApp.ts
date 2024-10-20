import { Whatsapp } from "@wppconnect-team/wppconnect";
import Builder from "../../Services/Builder/builder";

export const appWhatsapp = (client: Whatsapp) => {
    const blocos = new Builder(client);

    blocos.flow();

};

export default appWhatsapp;