import application from "./application";

const PORT = Number(process.env.PORT || 3000);

application.start(PORT);