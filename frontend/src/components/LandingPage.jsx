import { Globe, Youtube, Download, ArrowRight, Play } from 'lucide-react';

export const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Vocalyst</h1>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
          Transform Your Videos<br />
          Across Languages
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light">
          AI-powered dubbing that brings your content to global audiences. 
          Professional voice translations in 15+ languages, instantly.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            Start Dubbing
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Everything you need for professional dubbing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful AI technology that makes multilingual content creation easy and accessible
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">15+ Languages</h3>
            <p className="text-gray-600 text-sm">
              Support for Spanish, French, German, Italian, Portuguese, and many more languages
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Youtube className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">YouTube Integration</h3>
            <p className="text-gray-600 text-sm">
              Simply paste a YouTube URL and let our AI handle the rest. No downloads needed.
            </p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Download</h3>
            <p className="text-gray-600 text-sm">
              Get your dubbed content ready to use in minutes, not hours
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your content
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload or Link</h3>
            <p className="text-gray-600 text-sm">
              Paste a YouTube URL or upload your video file
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Language</h3>
            <p className="text-gray-600 text-sm">
              Select your target language from 15+ options
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Download</h3>
            <p className="text-gray-600 text-sm">
              Get your professionally dubbed video in minutes
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Ready to expand your audience?
          </h2>
          <p className="text-gray-600 mb-8">
            Start dubbing your videos today and reach viewers around the world
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2024 Vocalyst. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

