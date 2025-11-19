const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const DubbingJob = require('../models/DubbingJob');
const upload = require('../middleware/upload');
const { downloadYouTubeVideo } = require('../services/youtubeService');
const { processDubbing } = require('../services/dubbingService');

// Submit YouTube URL for dubbing
router.post('/youtube', async (req, res) => {
  try {
    const { url, targetLanguage } = req.body;

    if (!url || !targetLanguage) {
      return res.status(400).json({ error: 'URL and target language are required' });
    }

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const jobId = `job-${Date.now()}`;

    // Create job in database
    await DubbingJob.create({
      jobId,
      sourceType: 'youtube',
      sourceUrl: url,
      targetLanguage,
      status: 'processing',
    });

    res.json({ jobId, message: 'Job created successfully' });

    // Process in background
    try {
      const videoPath = path.join('uploads', `${jobId}.mp3`);
      await downloadYouTubeVideo(url, videoPath);
      await processDubbing(videoPath, targetLanguage, jobId);

      // Clean up original file
      fs.unlinkSync(videoPath);
    } catch (error) {
      console.error('Error processing YouTube video:', error);
    }
  } catch (error) {
    console.error('Error processing YouTube video:', error);
    res.status(500).json({ error: error.message });
  }
});

// Submit uploaded file for dubbing
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { targetLanguage } = req.body;
    const file = req.file;

    if (!file || !targetLanguage) {
      return res.status(400).json({ error: 'File and target language are required' });
    }

    const jobId = `job-${Date.now()}`;

    // Create job in database
    await DubbingJob.create({
      jobId,
      sourceType: 'upload',
      fileName: file.originalname,
      targetLanguage,
      status: 'processing',
    });

    res.json({ jobId, message: 'Job created successfully' });

    // Process in background
    try {
      await processDubbing(file.path, targetLanguage, jobId);

      // Clean up original file
      fs.unlinkSync(file.path);
    } catch (error) {
      console.error('Error processing uploaded file:', error);
    }
  } catch (error) {
    console.error('Error processing uploaded file:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

