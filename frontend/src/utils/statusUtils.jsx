import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export const getStatusIcon = (status) => {
  if (!status) return null;
  
  switch (status) {
    case 'processing':
    case 'dubbing':
      return <Loader2 className="w-6 h-6 text-gray-600 animate-spin" />;
    case 'completed':
      return <CheckCircle className="w-6 h-6 text-gray-900" />;
    case 'failed':
      return <XCircle className="w-6 h-6 text-red-600" />;
    default:
      return null;
  }
};

export const getStatusText = (jobStatus) => {
  if (!jobStatus) return '';
  
  switch (jobStatus.status) {
    case 'processing':
      return 'Processing your video...';
    case 'dubbing':
      return 'Dubbing in progress...';
    case 'completed':
      return 'Dubbing completed!';
    case 'failed':
      return `Failed: ${jobStatus.error || 'Unknown error'}`;
    default:
      return jobStatus.status;
  }
};


