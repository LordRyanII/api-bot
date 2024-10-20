import { Server, port } from './Configs/Server/server';

Server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
