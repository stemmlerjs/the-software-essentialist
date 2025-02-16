import express from 'express';

import { StudentsController } from './students/infra/students-controller';
import { ClassesController } from './classes/infra/classes-controller';
import { AssignmentsController } from './assignments/infra/assignments-controller';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/', new StudentsController().router);
app.use('/', new ClassesController().router);
app.use('/', new AssignmentsController().router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
