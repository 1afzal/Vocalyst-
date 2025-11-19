import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { LanguageSelector } from './components/LanguageSelector';
import { YoutubeForm } from './components/YoutubeForm';
import { UploadForm } from './components/UploadForm';
import { StatusDisplay } from './components/StatusDisplay';
import { ErrorMessage } from './components/ErrorMessage';
import { dubbingService } from './services/dubbingService';

export const DubbingInterface = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [currentJobId, setCurrentJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (currentJobId && jobStatus?.status !== 'completed' && jobStatus?.status !== 'failed') {
      interval = setInterval(async () => {
        try {
          const data = await dubbingService.getJobStatus(currentJobId);
          setJobStatus(data);
          
          if (data.status === 'completed' || data.status === 'failed') {
            setIsProcessing(false);
          }
        } catch (err) {
          console.error('Error fetching job status:', err);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentJobId, jobStatus?.status]);

  const handleYoutubeSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    setJobStatus(null);

    try {
      const data = await dubbingService.submitYouTubeUrl(youtubeUrl, targetLanguage);
      setCurrentJobId(data.jobId);
      setYoutubeUrl('');
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setError('');
    setIsProcessing(true);
    setJobStatus(null);

    try {
      const data = await dubbingService.submitUpload(selectedFile, targetLanguage);
      setCurrentJobId(data.jobId);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    window.open(dubbingService.downloadFile(currentJobId), '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBackToHome}
            className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Vocalyst
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <Header />

        <div className="mt-16 border border-gray-200 rounded-lg bg-white shadow-sm">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="p-8">
            <LanguageSelector
              value={targetLanguage}
              onChange={setTargetLanguage}
              disabled={isProcessing}
            />

            {activeTab === 'youtube' && (
              <YoutubeForm
                youtubeUrl={youtubeUrl}
                setYoutubeUrl={setYoutubeUrl}
                onSubmit={handleYoutubeSubmit}
                isProcessing={isProcessing}
              />
            )}

            {activeTab === 'upload' && (
              <UploadForm
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                onSubmit={handleFileSubmit}
                isProcessing={isProcessing}
              />
            )}

            <ErrorMessage error={error} />
            <StatusDisplay jobStatus={jobStatus} onDownload={handleDownload} />
          </div>
        </div>
      </div>
    </div>
  );
};

