const express = require('express');
const router = express.Router();
const { createBag, useAI } = require('../controllers/tokenController');

router.post('/create', createBag);
router.post('/use', useAI);

module.exports = router;