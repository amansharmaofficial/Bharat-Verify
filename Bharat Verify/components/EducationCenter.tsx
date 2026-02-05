
import React, { useState } from 'react';
import { EducationalModule, QuizQuestion } from '../types';

const modules: EducationalModule[] = [
  {
    id: '1',
    title: 'Anatomy of a Fake News Article',
    description: 'Learn to spot common red flags in sensationalist articles.',
    category: 'literacy',
    content: `Sensationalist headlines often use emotionally charged language. Look for missing bylines, unusual domain names (e.g., .co.co instead of .com), and lack of primary sources. 

### Key Red Flags:
1. **The URL**: Many fake news sites use URLs that look like legitimate news sources but have slight variations.
2. **The "About Us" Section**: Legitimate news organizations have detailed info about their leadership and ethics.
3. **Quotes**: Check if quotes from experts are attributed and can be found in other reputable outlets.
4. **Reverse Image Search**: Often, fake news uses old photos from unrelated events.

Always cross-reference shocking claims with at least two other established news agencies before sharing.`,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Spotting Deepfakes',
    description: 'Visual cues that reveal AI-generated or manipulated videos.',
    category: 'technology',
    content: `Deepfakes use artificial intelligence to replace the likeness of one person with another in video and audio. While technology is improving, forensic markers still exist.

### What to Look For:
- **Unnatural Blinking**: AI often struggles to replicate the complex patterns of human blinking.
- **Lighting Inconsistencies**: Look at the shadows on the face. Do they match the environment's light sources?
- **Skin Texture**: AI often "smoothes" skin too much, removing pores, wrinkles, or natural blemishes.
- **Audio-Visual Lag**: Check if the mouth movements perfectly sync with the phonemes being spoken.
- **Fine Details**: Earlobes, hair strands, and jewelry are notoriously difficult for current AI models to render perfectly.

Use tools like Bharat Verify's Video Forensic tool to detect these subtle markers automatically.`,
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'The Echo Chamber Effect',
    description: 'How algorithms can bias your perspective without you knowing.',
    category: 'tactics',
    content: `Social media algorithms show you content they think you like. This creates a feedback loop where you only see one side of an issue, reinforcing existing beliefs.

### How to Break Free:
1. **Follow Diverse Views**: Consciously follow sources that challenge your worldview.
2. **Incognito Search**: Use private browsing to see how search results vary without your personal data.
3. **Check the Source of the Source**: Always ask who funded the study or article you are reading.
4. **Pause Before Reacting**: Misinformation thrives on immediate emotional triggers. Take 30 seconds to breathe before hitting "Share".

By understanding your own cognitive biases, you become less susceptible to manipulation tactics designed to divide communities.`,
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800'
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'text',
    question: "You see a breaking news headline: 'Scientists discover miracle berry that cures all forms of cancer overnight!'",
    description: "The article is hosted on 'health-news-daily.co.in' and cites an anonymous source from an unnamed institute.",
    options: [
      { text: "Share it immediately to help others.", isCorrect: false, feedback: "Incorrect. Sensationalist claims of 'miracle cures' are a classic red flag for misinformation." },
      { text: "Search for the story on established medical news sites like WHO or Lancet.", isCorrect: true, feedback: "Correct! Extraordinary claims require extraordinary evidence from reputable, named sources." },
      { text: "Check if the berry is available for sale on the same site.", isCorrect: false, feedback: "Incorrect. While it's a good clue of a scam, verifying the factual basis is more important for news literacy." }
    ]
  },
  {
    id: 'q2',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=400',
    question: "You are watching a viral video of a politician making a shocking confession. You notice their ears look slightly blurry compared to their face.",
    description: "The audio sounds slightly robotic and the lighting on their neck doesn't match the background.",
    options: [
      { text: "It's likely a deepfake.", isCorrect: true, feedback: "Correct! Blurriness around edges like ears and mismatched lighting are common AI artifacts." },
      { text: "It's just poor camera quality.", isCorrect: false, feedback: "Incorrect. Poor quality usually affects the whole frame equally, not just specific features like ears or texture transitions." },
      { text: "Trust the video because seeing is believing.", isCorrect: false, feedback: "Incorrect. In the age of AI, 'seeing' is no longer sufficient proof of reality." }
    ]
  },
  {
    id: 'q3',
    type: 'text',
    question: "Your social media feed is filled with posts all supporting the same political view. You feel like everyone agrees with you.",
    description: "What is the most likely reason for this phenomenon?",
    options: [
      { text: "Your viewpoint is objectively the only correct one.", isCorrect: false, feedback: "Incorrect. This is a cognitive bias. Truth is rarely so one-sided in a diverse society." },
      { text: "You are in an 'Echo Chamber' created by engagement algorithms.", isCorrect: true, feedback: "Correct! Algorithms prioritize content you agree with to keep you on the platform longer." },
      { text: "Other viewpoints have been banned from the internet.", isCorrect: false, feedback: "Incorrect. Most platforms host diverse views, but your personal feed is curated for you." }
    ]
  }
];

const EducationCenter: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<EducationalModule | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const closeModal = () => setSelectedModule(null);

  const startQuiz = () => {
    setIsQuizOpen(true);
    setQuizStep(0);
    setQuizScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    if (quizQuestions[quizStep].options[index].isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextStep = () => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Literacy Academy</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Empower yourself with the skills to navigate the modern information landscape. Learn to think like a fact-checker.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((module) => (
          <div 
            key={module.id} 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={module.image} alt={module.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm
                  ${module.category === 'literacy' ? 'bg-emerald-500' : module.category === 'technology' ? 'bg-indigo-500' : 'bg-orange-500'}
                `}>
                  {module.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-gray-400 uppercase">
                <i className="fa-solid fa-clock"></i>
                <span>5 min read</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{module.title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{module.description}</p>
              <button 
                onClick={() => setSelectedModule(module)}
                className="w-full py-3 bg-gray-50 hover:bg-blue-600 hover:text-white text-blue-600 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                Read Module <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="relative z-10 md:flex items-center justify-between">
          <div className="md:max-w-xl">
            <h3 className="text-2xl font-bold mb-4">Take the Verification Challenge</h3>
            <p className="text-blue-100 mb-6">Test your skills with our interactive quiz. Can you spot the difference between real and AI-generated news?</p>
            <button 
              onClick={startQuiz}
              className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
            >
              Start Quiz
            </button>
          </div>
          <div className="hidden md:block">
            <i className="fa-solid fa-graduation-cap text-9xl text-white/10 -rotate-12"></i>
          </div>
        </div>
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Reader Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            {/* Modal Header Image */}
            <div className="h-64 relative flex-shrink-0">
              <img src={selectedModule.image} className="w-full h-full object-cover" alt={selectedModule.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="absolute bottom-6 left-8">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white mb-3 inline-block
                  ${selectedModule.category === 'literacy' ? 'bg-emerald-500' : selectedModule.category === 'technology' ? 'bg-indigo-500' : 'bg-orange-500'}
                `}>
                  {selectedModule.category}
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight">{selectedModule.title}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar bg-white">
              <div className="prose prose-slate max-w-none">
                <p className="text-xl text-gray-700 font-bold mb-8 leading-relaxed italic border-l-4 border-blue-500 pl-6">
                  {selectedModule.description}
                </p>
                <div className="text-gray-900 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                  {selectedModule.content}
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <i className="fa-solid fa-shield-halved text-xl"></i>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Verified Lesson</p>
                    <p className="text-xs text-gray-500">Bharat Verify Academic Team</p>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-blue-900/80 backdrop-blur-lg animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {!quizFinished ? (
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
                    Challenge: Question {quizStep + 1} of {quizQuestions.length}
                  </span>
                  <button onClick={() => setIsQuizOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <i className="fa-solid fa-xmark text-xl"></i>
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {quizQuestions[quizStep].question}
                  </h3>
                  {quizQuestions[quizStep].mediaUrl && (
                    <img 
                      src={quizQuestions[quizStep].mediaUrl} 
                      className="w-full h-48 object-cover rounded-2xl mb-4 border border-gray-100" 
                      alt="Question Context"
                    />
                  )}
                  <p className="text-gray-800 text-base italic bg-gray-100 p-5 rounded-xl border-l-4 border-gray-300 font-medium">
                    {quizQuestions[quizStep].description}
                  </p>
                </div>

                <div className="space-y-3">
                  {quizQuestions[quizStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-semibold flex items-center justify-between group
                        ${selectedOption === idx 
                          ? (option.isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700') 
                          : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-900'}
                        ${showFeedback && !option.isCorrect && selectedOption !== idx ? 'opacity-50' : ''}
                      `}
                    >
                      <span>{option.text}</span>
                      {showFeedback && option.isCorrect && (
                        <i className="fa-solid fa-circle-check text-green-500 text-lg"></i>
                      )}
                      {showFeedback && !option.isCorrect && selectedOption === idx && (
                        <i className="fa-solid fa-circle-xmark text-red-500 text-lg"></i>
                      )}
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
                    <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${quizQuestions[quizStep].options[selectedOption!].isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {quizQuestions[quizStep].options[selectedOption!].feedback}
                    </div>
                    <button 
                      onClick={nextStep}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                    >
                      {quizStep === quizQuestions.length - 1 ? 'Finish Challenge' : 'Next Question'}
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <i className="fa-solid fa-trophy text-5xl"></i>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Challenge Complete!</h2>
                <p className="text-gray-500 mb-8">You've successfully finished the Digital Literacy Challenge.</p>
                
                <div className="bg-gray-50 rounded-3xl p-8 mb-8">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Accuracy Score</div>
                  <div className="text-6xl font-black text-blue-600 mb-2">
                    {Math.round((quizScore / quizQuestions.length) * 100)}%
                  </div>
                  <p className="text-sm font-bold text-gray-600">
                    {quizScore} out of {quizQuestions.length} correct
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setIsQuizOpen(false)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg transition-all"
                  >
                    Back to Academy
                  </button>
                  <button 
                    onClick={startQuiz}
                    className="w-full py-4 text-blue-600 font-bold hover:bg-blue-50 rounded-2xl transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCenter;
