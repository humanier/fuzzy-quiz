import express = require('express');
import { questionsRepo } from '../data/questions-repo';

export const router = express.Router();

router.get('/first', (req, res) => {
    res.json(questionsRepo.first());
});

router.get('/:id/next', (req, res) => {
    const id: number = Number.parseInt(req.params.id, 10);
    res.json(questionsRepo.next(id));
});