const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Ontario Politics Tracker is running. Articles refresh automatically.");
});

module.exports = router;