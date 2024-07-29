import server from "./boostrap";

const PORT = Number(process.env.PORT || 3000);

server.start(PORT);
