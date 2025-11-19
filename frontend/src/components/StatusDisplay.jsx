import { Download } from 'lucide-react';
import { getStatusIcon, getStatusText } from '../utils/statusUtils';

export const StatusDisplay = ({ jobStatus, onDownload }) => {
  if (!jobStatus) return null;

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-md border border-gray-200">
      <div className="flex flex-col items-center">
        {getStatusIcon(jobStatus.status)}
        <p className="mt-4 text-base font-medium text-gray-900">
          {getStatusText(jobStatus)}
        </p>
        {jobStatus.status === 'completed' && (
          <button
            onClick={onDownload}
            className="mt-6 flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-md font-medium text-sm hover:bg-gray-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Dubbed Video
          </button>
        )}
      </div>
    </div>
  );
};


