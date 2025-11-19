import API_URL from '../config/api';

export const dubbingService = {
  submitYouTubeUrl: async (url, targetLanguage) => {
    try {
      const response = await fetch(`${API_URL}/dub/youtube`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, targetLanguage }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Server error' }));
        throw new Error(data.error || 'Failed to process video');
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 6969.');
      }
      throw error;
    }
  },

  submitUpload: async (file, targetLanguage) => {
    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('targetLanguage', targetLanguage);

      const response = await fetch(`${API_URL}/dub/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Server error' }));
        throw new Error(data.error || 'Failed to process video');
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 6969.');
      }
      throw error;
    }
  },

  getJobStatus: async (jobId) => {
    try {
      const response = await fetch(`${API_URL}/job/${jobId}`);
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Server error' }));
        throw new Error(data.error || 'Failed to fetch job status');
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 6969.');
      }
      throw error;
    }
  },

  downloadFile: (jobId) => {
    return `${API_URL}/download/${jobId}`;
  },
};


