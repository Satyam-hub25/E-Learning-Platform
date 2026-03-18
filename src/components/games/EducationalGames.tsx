'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FarmingGame from './FarmingGame';
import VocabularyGame from './VocabularyGame';

interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface GameStats {
  score: number;
  level: number;
  streak: number;
  totalQuestions: number;
  correctAnswers: number;
}

const educationalQuestions: GameQuestion[] = [
  // Math Questions
  {
    id: 'm1',
    question: 'If a farmer has 15 chickens and buys 8 more, how many chickens does he have in total?',
    options: ['20', '23', '25', '18'],
    correctAnswer: 1,
    subject: 'Math',
    difficulty: 'easy',
    points: 10
  },
  {
    id: 'm2',
    question: 'A village has 4 wells. Each well can provide water for 25 families. How many families can get water?',
    options: ['90', '100', '110', '120'],
    correctAnswer: 1,
    subject: 'Math',
    difficulty: 'medium',
    points: 15
  },
  {
    id: 'm3',
    question: 'If it takes 3 hours to harvest 1 acre of wheat, how long will it take to harvest 5 acres?',
    options: ['12 hours', '15 hours', '18 hours', '20 hours'],
    correctAnswer: 1,
    subject: 'Math',
    difficulty: 'medium',
    points: 15
  },
  
  // Science Questions
  {
    id: 's1',
    question: 'Which of these is the best natural fertilizer for crops?',
    options: ['Plastic waste', 'Cow dung', 'Metal scraps', 'Glass pieces'],
    correctAnswer: 1,
    subject: 'Science',
    difficulty: 'easy',
    points: 10
  },
  {
    id: 's2',
    question: 'What happens to plants during photosynthesis?',
    options: ['They eat soil', 'They make their own food using sunlight', 'They sleep', 'They drink only water'],
    correctAnswer: 1,
    subject: 'Science',
    difficulty: 'medium',
    points: 15
  },
  {
    id: 's3',
    question: 'Which season is best for planting rice in India?',
    options: ['Winter', 'Summer', 'Monsoon', 'Spring'],
    correctAnswer: 2,
    subject: 'Science',
    difficulty: 'easy',
    points: 10
  },
  
  // General Knowledge
  {
    id: 'g1',
    question: 'What is the capital of India?',
    options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
    correctAnswer: 1,
    subject: 'General Knowledge',
    difficulty: 'easy',
    points: 10
  },
  {
    id: 'g2',
    question: 'Which river is considered the holiest river in India?',
    options: ['Yamuna', 'Godavari', 'Ganga', 'Narmada'],
    correctAnswer: 2,
    subject: 'General Knowledge',
    difficulty: 'easy',
    points: 10
  }
];

const NumberGuessingGame: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setFeedback('I\'m thinking of a number between 1 and 100. Can you guess it?');
    setAttempts(0);
    setGameWon(false);
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum)) {
      setFeedback('Please enter a valid number!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === targetNumber) {
      setGameWon(true);
      const points = Math.max(100 - (newAttempts - 1) * 10, 10);
      setScore(score + points);
      setFeedback(`🎉 Correct! You got it in ${newAttempts} attempts! You earned ${points} points!`);
    } else if (guessNum < targetNumber) {
      setFeedback('📈 Too low! Try a higher number.');
    } else {
      setFeedback('📉 Too high! Try a lower number.');
    }

    setGuess('');
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">🔢 Number Guessing Game</h3>
        <div className="flex justify-center gap-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Attempts: {attempts}</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Score: {score}</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-700 mb-4">{feedback}</p>
        
        {!gameWon && (
          <div className="flex flex-col items-center gap-4">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              className="w-48 px-4 py-2 border-2 border-gray-300 rounded-lg text-center text-lg focus:border-blue-500 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            />
            <button
              onClick={handleGuess}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Make Guess! 🎯
            </button>
          </div>
        )}

        {gameWon && (
          <button
            onClick={startNewGame}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Play Again! 🎮
          </button>
        )}
      </div>
    </div>
  );
};

const QuizGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    level: 1,
    streak: 0,
    totalQuestions: 0,
    correctAnswers: 0
  });
  const [shuffledQuestions, setShuffledQuestions] = useState<GameQuestion[]>([]);

  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const shuffled = [...educationalQuestions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newStats = { ...gameStats };
    
    newStats.totalQuestions += 1;
    
    if (isCorrect) {
      newStats.correctAnswers += 1;
      newStats.streak += 1;
      newStats.score += currentQuestion.points + (newStats.streak > 1 ? newStats.streak * 5 : 0);
    } else {
      newStats.streak = 0;
    }
    
    if (newStats.score > newStats.level * 100) {
      newStats.level += 1;
    }
    
    setGameStats(newStats);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      startNewQuiz();
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">🧠 Educational Quiz</h3>
        <div className="flex gap-2 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Level {gameStats.level}</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Score: {gameStats.score}</span>
          {gameStats.streak > 1 && (
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">🔥 {gameStats.streak} Streak</span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{currentQuestion.subject} - {currentQuestion.difficulty}</span>
          <span>Question {currentQuestionIndex + 1}/{shuffledQuestions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.question}</h4>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: showResult ? 1 : 1.02 }}
              whileTap={{ scale: showResult ? 1 : 0.98 }}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                showResult
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : index === selectedAnswer
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                  : selectedAnswer === index
                  ? 'bg-blue-100 border-blue-500 text-blue-800'
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && index === currentQuestion.correctAnswer && (
                  <span className="text-green-600 text-xl">✓</span>
                )}
                {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                  <span className="text-red-600 text-xl">✗</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl mb-6 ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">{isCorrect ? '🎉' : '📚'}</div>
            <h4 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correct!' : 'Good Try!'}
            </h4>
            <p className="text-gray-700 mb-4">
              {isCorrect 
                ? `Great job! You earned ${currentQuestion.points} points!` 
                : `The correct answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}`
              }
            </p>
            <button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Next Question ➡️
            </button>
          </div>
        </motion.div>
      )}

      <div className="text-center text-sm text-gray-600">
        <p>Correct Answers: {gameStats.correctAnswers}/{gameStats.totalQuestions}</p>
        <p>Accuracy: {gameStats.totalQuestions > 0 ? Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100) : 0}%</p>
      </div>
    </div>
  );
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<{ id: number; value: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);

  const cardValues = ['🐄', '🌾', '🚜', '🏠', '🌳', '💧', '☀️', '🌙'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      setTimeout(() => {
        const [firstCard, secondCard] = newFlippedCards;
        const updatedCards = [...newCards];
        
        if (cards[firstCard].value === cards[secondCard].value) {
          updatedCards[firstCard].isMatched = true;
          updatedCards[secondCard].isMatched = true;
          setScore(score + 10);
          
          if (updatedCards.every(card => card.isMatched)) {
            setGameWon(true);
            setScore(score + Math.max(50 - moves * 2, 10));
          }
        } else {
          updatedCards[firstCard].isFlipped = false;
          updatedCards[secondCard].isFlipped = false;
        }
        
        setCards(updatedCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🧩 Memory Game</h3>
        <div className="flex justify-center gap-4 text-sm">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Moves: {moves}</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Score: {score}</span>
        </div>
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-6 p-6 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className="text-4xl mb-2">🏆</div>
          <h4 className="text-xl font-bold text-green-800 mb-2">Congratulations!</h4>
          <p className="text-green-700 mb-4">You completed the game in {moves} moves!</p>
          <button
            onClick={initializeGame}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Play Again! 🎮
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: card.isFlipped || card.isMatched ? 1 : 0.95 }}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl border-2 cursor-pointer flex items-center justify-center text-4xl transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? card.isMatched
                  ? 'bg-green-100 border-green-400'
                  : 'bg-blue-100 border-blue-400'
                : 'bg-gray-200 border-gray-400 hover:bg-gray-300'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.value : '?'}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">Match all the pairs to win! Click cards to flip them.</p>
      </div>
    </div>
  );
};

const EducationalGames: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<string>('menu');

  const games = [
    {
      id: 'quiz',
      title: 'Educational Quiz',
      description: 'Test your knowledge with fun questions about math, science, and general knowledge',
      icon: '🧠',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'farming',
      title: 'Virtual Farm',
      description: 'Learn about agriculture by managing your own virtual farm',
      icon: '🚜',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'vocabulary',
      title: 'Hindi-English Words',
      description: 'Learn vocabulary in both Hindi and English with interactive games',
      icon: '📚',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'memory',
      title: 'Memory Game',
      description: 'Improve your memory by matching pairs of rural life symbols',
      icon: '🧩',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'numbers',
      title: 'Number Guessing',
      description: 'Practice math skills with this fun number guessing game',
      icon: '🔢',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const renderCurrentGame = () => {
    switch (currentGame) {
      case 'quiz':
        return <QuizGame />;
      case 'farming':
        return <FarmingGame />;
      case 'vocabulary':
        return <VocabularyGame />;
      case 'memory':
        return <MemoryGame />;
      case 'numbers':
        return <NumberGuessingGame />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">🎮 Educational Games</h2>
              <p className="text-white/80 text-lg">Learn while you play! Choose a game to start your educational adventure.</p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentGame(game.id)}
                  className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 cursor-pointer shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="text-center text-white">
                    <div className="text-5xl mb-4">{game.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{game.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{game.description}</p>
                    <div className="bg-white/20 rounded-lg py-2 px-4 inline-block">
                      <span className="text-sm font-medium">Click to Play!</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-white text-lg font-semibold mb-2">🌟 Perfect for Rural Learning!</h3>
                <p className="text-white/80 text-sm">
                  These games use relatable examples from village life and farming to make learning fun and relevant for rural students.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
      <div className="max-w-6xl mx-auto">
        {currentGame !== 'menu' && (
          <div className="mb-6">
            <button
              onClick={() => setCurrentGame('menu')}
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2 text-lg"
            >
              ← Back to Games Menu
            </button>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGame}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentGame()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EducationalGames;