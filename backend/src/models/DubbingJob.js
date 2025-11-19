const mongoose = require('mongoose');

const dubbingJobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  sourceType: { type: String, enum: ['youtube', 'upload'], required: true },
  sourceUrl: String,
  fileName: String,
  targetLanguage: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['processing', 'dubbing', 'completed', 'failed'], 
    default: 'processing' 
  },
  elevenLabsJobId: String,
  outputFilePath: String,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
  error: String,
});

module.exports = mongoose.model('DubbingJob', dubbingJobSchema);

