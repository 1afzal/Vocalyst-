import React from 'react';
import { Globe, Youtube, Download } from 'lucide-react';

export const Features = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div className="text-center">
        <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">15+ Languages</h3>
        <p className="text-purple-200 text-sm">
          Support for multiple languages including Spanish, French, German, and more
        </p>
      </div>
      <div className="text-center">
        <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Youtube className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">YouTube Integration</h3>
        <p className="text-purple-200 text-sm">
          Directly dub videos from YouTube by simply pasting the URL
        </p>
      </div>
      <div className="text-center">
        <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Download className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">Easy Download</h3>
        <p className="text-purple-200 text-sm">
          Download your dubbed videos instantly after processing completes
        </p>
      </div>
    </div>
  );
};

