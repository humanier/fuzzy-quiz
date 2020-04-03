import express = require('express');
import { answersRepo } from '../data/answers-repo';

export const answersRouter = express.Router();

answersRouter.post('/check', (req, res) => {
    const questionId: number = Number.parseInt(req.body.questionId, 10);
    const userInput: string = req.body.userInput;

    answersRepo.check(questionId, userInput)
        .then(checkResult => res.json(checkResult))
        .catch((e: Error) => { throw e });
});