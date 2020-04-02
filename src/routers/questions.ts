import express = require('express');

export const router = express.Router();

router.get('/first', (req, res) => {
    res.json({ whaaaat: "?" });
});

router.get(':id/next', (req, res) => {
    res.json({ whaaaat: "?" });
});