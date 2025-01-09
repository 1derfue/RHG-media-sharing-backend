const express = require('express');
const multer = require('multer');
const Media = require('../models/Media');
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Upload media
router.post('/upload', upload.single('file'), async (req, res) => {
  const { title, description, uploadedBy } = req.body;
  try {
    const media = new Media({
      title,
      description,
      filePath: req.file.path,
      uploadedBy,
    });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all media
router.get('/', async (req, res) => {
  try {
    const media = await Media.find().populate('uploadedBy', 'username');
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

