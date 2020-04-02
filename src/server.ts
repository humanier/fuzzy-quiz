import express = require('express');
import { router as questionsRouter } from './routers/questions';

const app: express.Application = express();

app.use('/api/v1/questions', questionsRouter);

app.listen(8080, () => console.log("Fuzzy quiz web server has started on port 8080"));