import { Youtube, Upload } from 'lucide-react';

export const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => setActiveTab('youtube')}
        className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors border-b-2 ${
          activeTab === 'youtube'
            ? 'text-gray-900 border-gray-900'
            : 'text-gray-500 border-transparent hover:text-gray-700'
        }`}
      >
        <Youtube className="inline-block w-4 h-4 mr-2" />
        YouTube URL
      </button>
      <button
        onClick={() => setActiveTab('upload')}
        className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors border-b-2 ${
          activeTab === 'upload'
            ? 'text-gray-900 border-gray-900'
            : 'text-gray-500 border-transparent hover:text-gray-700'
        }`}
      >
        <Upload className="inline-block w-4 h-4 mr-2" />
        Upload Video
      </button>
    </div>
  );
};


