import { Upload } from 'lucide-react';

export const UploadForm = ({ selectedFile, setSelectedFile, onSubmit, isProcessing }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Video File
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="video/*,audio/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="hidden"
            id="file-upload"
            disabled={isProcessing}
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer flex flex-col items-center ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {selectedFile
                ? selectedFile.name
                : 'Click to upload or drag and drop'}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              MP4, MOV, AVI, MP3, WAV (max 100MB)
            </span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={isProcessing || !selectedFile}
        className="w-full bg-gray-900 text-white py-2.5 rounded-md font-medium text-sm hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing...' : 'Start Dubbing'}
      </button>
    </form>
  );
};


