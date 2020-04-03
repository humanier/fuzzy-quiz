import express = require('express');
import * as path from 'path';

import { questionsRouter } from './routers/questions';
import { answersRouter } from './routers/answers';

import { answersRepo } from './data/answers-repo';
import bodyParser from 'body-parser';

const app: express.Application = express();

app.use(bodyParser.json());

const staticContentOptions = {
    dotfiles: 'ignore',
    extensions: ['htm', 'html', 'js', 'css'],
    index: false,
    redirect: false,
};

const staticRoute = express.static(path.join(__dirname,'www'), staticContentOptions);
app.use(staticRoute);

app.use('/api/v1/questions', questionsRouter);
app.use('/api/v1/answers', answersRouter);

answersRepo.seedIndex();

app.listen(8080, () => console.log("Fuzzy quiz web server has started on port 8080"));