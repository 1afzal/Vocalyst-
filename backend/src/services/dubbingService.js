const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');
const fs = require('fs');
const path = require('path');
const DubbingJob = require('../models/DubbingJob');

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const processDubbing = async (filePath, targetLang, jobId) => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const audioBlob = new Blob([fileBuffer], { type: 'audio/mp3' });

    // Start dubbing
    const dubbed = await elevenlabs.dubbing.create({
      file: audioBlob,
      targetLang: targetLang,
    });

    // Update job with ElevenLabs job ID
    await DubbingJob.findOneAndUpdate(
      { jobId },
      { 
        elevenLabsJobId: dubbed.dubbingId,
        status: 'dubbing' 
      }
    );

    // Poll for completion
    let status = 'dubbing';
    while (status !== 'dubbed') {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const dubbingStatus = await elevenlabs.dubbing.get(dubbed.dubbingId);
      status = dubbingStatus.status;

      if (status === 'failed') {
        throw new Error('Dubbing failed');
      }
    }

    // Download dubbed audio
    const dubbedFile = await elevenlabs.dubbing.audio.get(
      dubbed.dubbingId,
      targetLang
    );

    const outputPath = path.join('downloads', `${jobId}-dubbed.mp3`);
    
    // Handle different return types from the SDK
    let buffer;
    if (Buffer.isBuffer(dubbedFile)) {
      // Already a buffer
      buffer = dubbedFile;
    } else if (dubbedFile.arrayBuffer && typeof dubbedFile.arrayBuffer === 'function') {
      // Has arrayBuffer method (Blob/Response)
      buffer = Buffer.from(await dubbedFile.arrayBuffer());
    } else if (dubbedFile instanceof ReadableStream || dubbedFile.pipe) {
      // Is a stream
      const chunks = [];
      for await (const chunk of dubbedFile) {
        chunks.push(chunk);
      }
      buffer = Buffer.concat(chunks);
    } else {
      // Try converting directly
      buffer = Buffer.from(dubbedFile);
    }
    
    fs.writeFileSync(outputPath, buffer);

    // Update job as completed
    await DubbingJob.findOneAndUpdate(
      { jobId },
      { 
        status: 'completed',
        outputFilePath: outputPath,
        completedAt: new Date()
      }
    );

    return outputPath;
  } catch (error) {
    console.error('Dubbing error:', error);
    await DubbingJob.findOneAndUpdate(
      { jobId },
      { 
        status: 'failed',
        error: error.message 
      }
    );
    throw error;
  }
};

module.exports = {
  processDubbing,
};