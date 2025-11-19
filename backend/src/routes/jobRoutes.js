const express = require('express');
const router = express.Router();
const fs = require('fs');
const DubbingJob = require('../models/DubbingJob');

// Get all jobs (optional - for admin/history)
router.get('/', async (req, res) => {
  try {
    const jobs = await DubbingJob.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download dubbed file
router.get('/:jobId/download', async (req, res) => {
  try {
    const job = await DubbingJob.findOne({ jobId: req.params.jobId });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.status !== 'completed') {
      return res.status(400).json({ error: 'Job not completed yet' });
    }

    if (!job.outputFilePath || !fs.existsSync(job.outputFilePath)) {
      return res.status(404).json({ error: 'Output file not found' });
    }

    res.download(job.outputFilePath, `dubbed-${job.jobId}.mp3`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job status
router.get('/:jobId', async (req, res) => {
  try {
    const job = await DubbingJob.findOne({ jobId: req.params.jobId });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
      jobId: job.jobId,
      status: job.status,
      sourceType: job.sourceType,
      targetLanguage: job.targetLanguage,
      outputFilePath: job.outputFilePath,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      error: job.error,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

