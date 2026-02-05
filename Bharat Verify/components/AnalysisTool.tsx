
import React, { useState, useRef } from 'react';
import { analyzeText, analyzeImage, analyzeVideo } from '../services/geminiService';
import { VerificationResult, VerificationStatus } from '../types';
import TruthMeter from './TruthMeter';

const AnalysisTool: React.FC = () => {
  const [inputType, setInputType] = useState<'text' | 'image' | 'video'>('text');
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const saveToHistory = (newResult: VerificationResult) => {
    try {
      const existingHistory = localStorage.getItem('bharat_verify_history');
      const history: VerificationResult[] = existingHistory ? JSON.parse(existingHistory) : [];
      const updatedHistory = [newResult, ...history.filter(h => h.id !== newResult.id)].slice(0, 50);
      localStorage.setItem('bharat_verify_history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save to history", e);
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeText(textInput);
      setResult(data);
      saveToHistory(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        handleImageSubmit(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      processVideo(url);
    }
  };

  const processVideo = async (videoUrl: string) => {
    setLoading(true);
    setResult(null);
    
    try {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.play();

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(true);
        };
      });

      const duration = video.duration;
      const frames: string[] = [];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      for (let i = 1; i <= 5; i++) {
        const time = (duration / 6) * i;
        video.currentTime = time;
        await new Promise((resolve) => {
          video.onseeked = resolve;
        });
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        frames.push(canvas.toDataURL('image/jpeg', 0.7));
      }

      video.pause();
      const data = await analyzeVideo(frames);
      setResult(data);
      saveToHistory(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing video forensic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeImage(base64);
      setResult(data);
      saveToHistory(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
        <div className="flex border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button 
            onClick={() => { setInputType('text'); setResult(null); }}
            className={`flex-1 min-w-[120px] py-4 text-center font-semibold transition-colors ${inputType === 'text' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <i className="fa-solid fa-file-lines mr-2"></i> Text
          </button>
          <button 
            onClick={() => { setInputType('image'); setResult(null); }}
            className={`flex-1 min-w-[120px] py-4 text-center font-semibold transition-colors ${inputType === 'image' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <i className="fa-solid fa-image mr-2"></i> Image
          </button>
          <button 
            onClick={() => { setInputType('video'); setResult(null); }}
            className={`flex-1 min-w-[120px] py-4 text-center font-semibold transition-colors ${inputType === 'video' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <i className="fa-solid fa-video mr-2"></i> Video
          </button>
        </div>

        <div className="p-6">
          {inputType === 'text' ? (
            <form onSubmit={handleTextSubmit}>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste news content, claims, or article URLs here..."
                className="w-full h-48 p-5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none resize-none text-gray-900 text-lg leading-relaxed placeholder-gray-400 font-normal"
              />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium italic">Powered by Gemini AI Fact-Checking</span>
                <button
                  type="submit"
                  disabled={loading || !textInput.trim()}
                  className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${loading || !textInput.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                >
                  {loading ? <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> : <i className="fa-solid fa-magnifying-glass mr-2"></i>}
                  {loading ? 'Analyzing...' : 'Verify Content'}
                </button>
              </div>
            </form>
          ) : inputType === 'image' ? (
            <div className="text-center py-8">
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                    <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Upload Image</h3>
                  <p className="text-gray-500 mt-2">Screenshots or viral photos</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative inline-block group">
                    <img src={imagePreview} alt="Preview" className="max-h-80 rounded-xl shadow-md border border-gray-200 mx-auto" />
                    <button 
                      onClick={() => { setImagePreview(null); setResult(null); }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  {loading && (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-blue-600 font-medium animate-pulse">Running Forensic Analysis...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              {!videoPreview ? (
                <div 
                  onClick={() => videoInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
                    <i className="fa-solid fa-film text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">Upload Video</h3>
                  <p className="text-gray-500 mt-2">Deepfake detection & temporal analysis</p>
                  <input 
                    type="file" 
                    ref={videoInputRef} 
                    className="hidden" 
                    accept="video/*" 
                    onChange={handleVideoFileChange} 
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative inline-block w-full max-w-lg group">
                    <video src={videoPreview} controls className="w-full rounded-xl shadow-md border border-gray-200 mx-auto" />
                    <button 
                      onClick={() => { setVideoPreview(null); setResult(null); }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  {loading && (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-blue-600 font-medium animate-pulse">Extracting Frames & Analyzing Deepfake Markers...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <TruthMeter score={result.score} status={result.status} />
              
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Summary</h2>
                  <p className="text-gray-600 leading-relaxed">{result.summary}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Detailed Explanation</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{result.explanation}</p>
                </div>

                {result.anomalies && result.anomalies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Detected Anomalies</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.anomalies.map((anomaly, idx) => (
                        <span key={idx} className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium">
                          <i className="fa-solid fa-triangle-exclamation mr-1.5"></i> {anomaly}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.isDeepfake && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4">
                      <i className="fa-solid fa-mask"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-800 uppercase text-xs">Deepfake Alert</h4>
                      <p className="text-red-700 text-sm">Our AI models have detected markers characteristic of synthetic or deepfake media.</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Source Credibility</div>
                    <div className="text-lg font-bold text-slate-700">{result.credibilityScore}%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Bias Assessment</div>
                    <div className="text-lg font-bold text-slate-700">{result.biasScore > 50 ? 'Biased' : 'Neutral'} ({result.biasScore}%)</div>
                  </div>
                </div>

                {result.sources.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Grounding Sources</h3>
                    <div className="space-y-2">
                      {result.sources.map((source, idx) => (
                        <a 
                          key={idx} 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors group"
                        >
                          <i className="fa-solid fa-link text-blue-400 mr-3 text-sm"></i>
                          <span className="text-sm font-medium text-blue-700 group-hover:underline truncate">{source.title}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square ml-auto text-blue-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisTool;
