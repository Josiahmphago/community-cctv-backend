const express = require('express');
const multer = require('multer');
const Notification = require('../models/Notification'); // Ensure this model exists
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/panic-alert', upload.single('photo'), async (req, res) => {
    const { message } = req.body;
    const photo = req.file ? req.file.path : null;
    const notification = new Notification({ message, photo });
    await notification.save();
    res.json({ success: true, message: 'Alert sent' });
});

module.exports = router;
