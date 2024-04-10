import express from 'express';
import { AssignmentsRouter, ClassesRouter, StudentsRouter } from './controllers';
import { enableGracefulShutdown } from './shared/server';


const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/students', StudentsRouter); 
app.use('/classes', ClassesRouter);
app.use('/assignments', AssignmentsRouter);


const server = app.listen(port, () => console.log(`Listening on port ${port}`));
enableGracefulShutdown(server);
