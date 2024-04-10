import express from 'express';
import { AssignmentsRouter, ClassesRouter, StudentsRouter } from './controllers';


const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/students', StudentsRouter); 
app.use('/classes', ClassesRouter);
app.use('/assignments', AssignmentsRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));
