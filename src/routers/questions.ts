import express = require('express');
import { questionsRepo } from '../data/questions-repo';

export const questionsRouter = express.Router();

questionsRouter.get('/first', (req, res) => {
    const firstQuestion = questionsRepo.first();

    res.json({
        id: firstQuestion.id,
        question: firstQuestion.question
    });
});

questionsRouter.get('/:id/next', (req, res) => {
    const id: number = Number.parseInt(req.params.id, 10);
    const nextQuestion = questionsRepo.next(id);

    res.json({
        id: nextQuestion.id,
        question: nextQuestion.question
    });
});