const ytdl = require('ytdl-core');
const fs = require('fs');

const downloadYouTubeVideo = async (url, outputPath) => {
  return new Promise((resolve, reject) => {
    if (!ytdl.validateURL(url)) {
      return reject(new Error('Invalid YouTube URL'));
    }

    const video = ytdl(url, { quality: 'highestaudio' });
    const writeStream = fs.createWriteStream(outputPath);
    
    video.pipe(writeStream);
    
    writeStream.on('finish', () => resolve(outputPath));
    writeStream.on('error', reject);
    video.on('error', reject);
  });
};

module.exports = {
  downloadYouTubeVideo,
};

