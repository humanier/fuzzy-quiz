import express = require('express');
import path = require('path');
import { router as questionsRouter } from './routers/questions';

const app: express.Application = express();

const staticContentOptions = {
    dotfiles: 'ignore',
    extensions: ['htm', 'html', 'js', 'css'],
    index: false,
    redirect: false,
};

const staticRoute = express.static(path.join(__dirname,'www'), staticContentOptions);
app.use(staticRoute);

app.use('/api/v1/questions', questionsRouter);

app.listen(8080, () => console.log("Fuzzy quiz web server has started on port 8080"));