export const YoutubeForm = ({ youtubeUrl, setYoutubeUrl, onSubmit, isProcessing }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          YouTube URL
        </label>
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 disabled:bg-gray-50 disabled:cursor-not-allowed text-sm text-gray-900 placeholder-gray-400"
          disabled={isProcessing}
        />
      </div>
      <button
        type="submit"
        disabled={isProcessing || !youtubeUrl}
        className="w-full bg-gray-900 text-white py-2.5 rounded-md font-medium text-sm hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing...' : 'Start Dubbing'}
      </button>
    </form>
  );
};


