import Express from 'express';
import routes from '../../Routers/router';
const port = process.env.PORT || "3005";
const Server = Express();

Server.use(Express.urlencoded({ extended: true }));
Server.use(routes);

export { port, Server };