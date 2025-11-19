const express = require('express');
const router = express.Router();
const fs = require('fs');
const DubbingJob = require('../models/DubbingJob');
const dubbingRoutes = require('./dubbingRoutes');
const jobRoutes = require('./jobRoutes');

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Legacy download route (backward compatibility)
router.get('/download/:jobId', async (req, res) => {
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

// Mount routes
router.use('/dub', dubbingRoutes);
router.use('/job', jobRoutes);

module.exports = router;

