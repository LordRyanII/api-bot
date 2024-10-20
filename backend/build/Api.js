"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./Configs/Server/server");
server_1.Server.listen(server_1.port, () => {
    console.log(`Server is running on port ${server_1.port}`);
});
