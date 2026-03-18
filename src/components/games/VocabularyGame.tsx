'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Word {
  id: string;
  english: string;
  hindi: string;
  pronunciation: string;
  category: string;
  image: string;
}

interface GameStats {
  score: number;
  streak: number;
  wordsLearned: number;
  accuracy: number;
}

const vocabularyWords: Word[] = [
  // Animals
  { id: 'cow', english: 'Cow', hindi: 'गाय', pronunciation: 'Gaay', category: 'Animals', image: '🐄' },
  { id: 'buffalo', english: 'Buffalo', hindi: 'भैंस', pronunciation: 'Bhains', category: 'Animals', image: '🐃' },
  { id: 'goat', english: 'Goat', hindi: 'बकरी', pronunciation: 'Bakri', category: 'Animals', image: '🐐' },
  { id: 'chicken', english: 'Chicken', hindi: 'मुर्गी', pronunciation: 'Murgi', category: 'Animals', image: '🐔' },
  { id: 'dog', english: 'Dog', hindi: 'कुत्ता', pronunciation: 'Kutta', category: 'Animals', image: '🐕' },
  
  // Nature
  { id: 'tree', english: 'Tree', hindi: 'पेड़', pronunciation: 'Ped', category: 'Nature', image: '🌳' },
  { id: 'water', english: 'Water', hindi: 'पानी', pronunciation: 'Paani', category: 'Nature', image: '💧' },
  { id: 'sun', english: 'Sun', hindi: 'सूर्य', pronunciation: 'Surya', category: 'Nature', image: '☀️' },
  { id: 'moon', english: 'Moon', hindi: 'चाँद', pronunciation: 'Chaand', category: 'Nature', image: '🌙' },
  { id: 'rain', english: 'Rain', hindi: 'बारिश', pronunciation: 'Baarish', category: 'Nature', image: '🌧️' },
  
  // Food
  { id: 'rice', english: 'Rice', hindi: 'चावल', pronunciation: 'Chaawal', category: 'Food', image: '🍚' },
  { id: 'wheat', english: 'Wheat', hindi: 'गेहूँ', pronunciation: 'Gehun', category: 'Food', image: '🌾' },
  { id: 'milk', english: 'Milk', hindi: 'दूध', pronunciation: 'Dudh', category: 'Food', image: '🥛' },
  { id: 'bread', english: 'Bread', hindi: 'रोटी', pronunciation: 'Roti', category: 'Food', image: '🫓' },
  { id: 'vegetable', english: 'Vegetable', hindi: 'सब्जी', pronunciation: 'Sabzi', category: 'Food', image: '🥬' },
  
  // Family
  { id: 'mother', english: 'Mother', hindi: 'माता', pronunciation: 'Mata', category: 'Family', image: '👩' },
  { id: 'father', english: 'Father', hindi: 'पिता', pronunciation: 'Pita', category: 'Family', image: '👨' },
  { id: 'brother', english: 'Brother', hindi: 'भाई', pronunciation: 'Bhai', category: 'Family', image: '👦' },
  { id: 'sister', english: 'Sister', hindi: 'बहन', pronunciation: 'Behen', category: 'Family', image: '👧' },
  { id: 'child', english: 'Child', hindi: 'बच्चा', pronunciation: 'Bachcha', category: 'Family', image: '🧒' },
  
  // Numbers
  { id: 'one', english: 'One', hindi: 'एक', pronunciation: 'Ek', category: 'Numbers', image: '1️⃣' },
  { id: 'two', english: 'Two', hindi: 'दो', pronunciation: 'Do', category: 'Numbers', image: '2️⃣' },
  { id: 'three', english: 'Three', hindi: 'तीन', pronunciation: 'Teen', category: 'Numbers', image: '3️⃣' },
  { id: 'four', english: 'Four', hindi: 'चार', pronunciation: 'Chaar', category: 'Numbers', image: '4️⃣' },
  { id: 'five', english: 'Five', hindi: 'पाँच', pronunciation: 'Paanch', category: 'Numbers', image: '5️⃣' }
];

const VocabularyGame: React.FC = () => {
  const [gameMode, setGameMode] = useState<'learn' | 'quiz' | 'match'>('learn');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quizOptions, setQuizOptions] = useState<Word[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    streak: 0,
    wordsLearned: 0,
    accuracy: 0
  });
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const categories = ['All', ...Array.from(new Set(vocabularyWords.map(w => w.category)))];
  
  const filteredWords = selectedCategory === 'All' 
    ? vocabularyWords 
    : vocabularyWords.filter(w => w.category === selectedCategory);

  const currentWord = filteredWords[currentWordIndex] || vocabularyWords[0];

  useEffect(() => {
    if (gameMode === 'quiz') {
      generateQuizOptions();
    }
  }, [currentWordIndex, gameMode, selectedCategory]);

  const generateQuizOptions = () => {
    const correctWord = currentWord;
    const otherWords = vocabularyWords
      .filter(w => w.id !== correctWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [correctWord, ...otherWords].sort(() => Math.random() - 0.5);
    setQuizOptions(options);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleQuizAnswer = (selectedWord: Word) => {
    if (showResult) return;
    
    setSelectedAnswer(selectedWord.id);
    setShowResult(true);
    
    const isCorrect = selectedWord.id === currentWord.id;
    const newTotalQuestions = totalQuestions + 1;
    const newCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
    
    setTotalQuestions(newTotalQuestions);
    setCorrectAnswers(newCorrectAnswers);
    
    const newStats = { ...gameStats };
    
    if (isCorrect) {
      newStats.streak += 1;
      newStats.score += 10 + (newStats.streak > 1 ? newStats.streak * 2 : 0);
    } else {
      newStats.streak = 0;
    }
    
    newStats.accuracy = Math.round((newCorrectAnswers / newTotalQuestions) * 100);
    setGameStats(newStats);
  };

  const nextWord = () => {
    const nextIndex = (currentWordIndex + 1) % filteredWords.length;
    setCurrentWordIndex(nextIndex);
    
    if (gameMode === 'learn') {
      setGameStats(prev => ({ ...prev, wordsLearned: prev.wordsLearned + 1 }));
    }
  };

  const previousWord = () => {
    const prevIndex = currentWordIndex > 0 ? currentWordIndex - 1 : filteredWords.length - 1;
    setCurrentWordIndex(prevIndex);
  };

  const LearnMode = () => (
    <div className="text-center">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6">
        <div className="text-8xl mb-4">{currentWord.image}</div>
        <h3 className="text-3xl font-bold text-gray-800 mb-2">{currentWord.english}</h3>
        <div className="text-4xl font-bold text-blue-600 mb-2">{currentWord.hindi}</div>
        <div className="text-lg text-gray-600 mb-4">({currentWord.pronunciation})</div>
        <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          {currentWord.category}
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={previousWord}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
        >
          ← Previous
        </button>
        <button
          onClick={nextWord}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Next →
        </button>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        Word {currentWordIndex + 1} of {filteredWords.length} in {selectedCategory}
      </div>
    </div>
  );

  const QuizMode = () => (
    <div className="text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          What is the Hindi word for:
        </h3>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
          <div className="text-6xl mb-3">{currentWord.image}</div>
          <div className="text-2xl font-bold text-gray-800">{currentWord.english}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {quizOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: showResult ? 1 : 1.02 }}
            whileTap={{ scale: showResult ? 1 : 0.98 }}
            onClick={() => handleQuizAnswer(option)}
            disabled={showResult}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              showResult
                ? option.id === currentWord.id
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : option.id === selectedAnswer
                  ? 'bg-red-100 border-red-500 text-red-800'
                  : 'bg-gray-100 border-gray-300 text-gray-600'
                : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            <div className="text-2xl font-bold">{option.hindi}</div>
            <div className="text-sm text-gray-600">({option.pronunciation})</div>
            {showResult && option.id === currentWord.id && (
              <div className="text-green-600 text-xl mt-2">✓</div>
            )}
            {showResult && option.id === selectedAnswer && option.id !== currentWord.id && (
              <div className="text-red-600 text-xl mt-2">✗</div>
            )}
          </motion.button>
        ))}
      </div>
      
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl mb-4 ${
            selectedAnswer === currentWord.id 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="text-lg font-semibold mb-2">
            {selectedAnswer === currentWord.id ? '🎉 Correct!' : '📚 Good try!'}
          </div>
          <div className="text-sm text-gray-700">
            {currentWord.english} = {currentWord.hindi} ({currentWord.pronunciation})
          </div>
          <button
            onClick={nextWord}
            className="mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Next Question →
          </button>
        </motion.div>
      )}
      
      <div className="text-sm text-gray-600">
        Question {currentWordIndex + 1} of {filteredWords.length}
      </div>
    </div>
  );

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">📚 Hindi-English Vocabulary</h3>
        <p className="text-gray-600">Learn words in both Hindi and English!</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-800">{gameStats.score}</div>
          <div className="text-xs text-blue-600">Score</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-800">{gameStats.wordsLearned}</div>
          <div className="text-xs text-green-600">Words Learned</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-800">{gameStats.accuracy}%</div>
          <div className="text-xs text-purple-600">Accuracy</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-orange-800">{gameStats.streak}</div>
          <div className="text-xs text-orange-600">Streak</div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setGameMode('learn')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            gameMode === 'learn'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📖 Learn
        </button>
        <button
          onClick={() => setGameMode('quiz')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            gameMode === 'quiz'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🧠 Quiz
        </button>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Category:</h4>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentWordIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Game Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gameMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {gameMode === 'learn' ? <LearnMode /> : <QuizMode />}
        </motion.div>
      </AnimatePresence>

      {/* Instructions */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">📝 Learning Tips:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Start with "Learn" mode to familiarize yourself with words</li>
          <li>• Practice pronunciation by saying the words out loud</li>
          <li>• Use "Quiz" mode to test your knowledge</li>
          <li>• Focus on one category at a time for better learning</li>
        </ul>
      </div>
    </div>
  );
};

export default VocabularyGame;