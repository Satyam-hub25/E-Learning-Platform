"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/AuthContext';
import { QuestionSkeleton as QuestionSkeletonLoader } from '../ui/SkeletonLoader';

interface Question {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface UserProgress {
  points: number;
  level: number;
  badges: string[];
  totalQuestionsAnswered: number;
  correctAnswers: number;
  subjects: {
    [subject: string]: {
      points: number;
      questionsAnswered: number;
      correctAnswers: number;
    };
  };
}

interface QuizResult {
  correct: boolean;
  points: number;
  totalPoints: number;
  correctAnswer: number;
  explanation: string;
  newLevel?: number;
  newBadges?: string[];
}

const subjects = [
  { id: 'mathematics', name: 'Mathematics', icon: '🔢', color: 'from-blue-500 to-cyan-500' },
  { id: 'science', name: 'Science', icon: '🔬', color: 'from-green-500 to-emerald-500' },
  { id: 'history', name: 'History', icon: '🏛️', color: 'from-yellow-500 to-orange-500' },
  { id: 'geography', name: 'Geography', icon: '🌍', color: 'from-purple-500 to-pink-500' },
  { id: 'english', name: 'English', icon: '📚', color: 'from-indigo-500 to-blue-500' },
  { id: 'physics', name: 'Physics', icon: '⚛️', color: 'from-red-500 to-rose-500' },
  { id: 'computer science', name: 'Computer Science', icon: '💻', color: 'from-teal-500 to-cyan-500' },
];

// Skeleton loading component for better UX
const QuestionSkeleton = () => (
  <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="h-6 bg-gray-300 rounded w-32"></div>
      <div className="flex items-center gap-3">
        <div className="h-8 bg-gray-300 rounded-full w-24"></div>
        <div className="h-8 bg-gray-300 rounded-full w-20"></div>
      </div>
    </div>
    
    <div className="text-center mb-8">
      <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
    </div>
    
    <div className="space-y-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-14 bg-gray-300 rounded-xl"></div>
      ))}
    </div>
    
    <div className="h-14 bg-gray-300 rounded-xl"></div>
  </div>
);

// Loading progress component
const LoadingProgress = ({ message, isPreloading }: { message: string; isPreloading?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center"
  >
    <div className="text-4xl mb-4">⚡</div>
    <h3 className="text-xl font-bold mb-4">{message}</h3>
    
    <div className="flex justify-center mb-4">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
    </div>
    
    <p className="text-gray-600 text-sm">
      {isPreloading ? "Preparing questions for faster gameplay..." : "Please wait..."}
    </p>
  </motion.div>
);

const GamifiedQuiz = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  
  // Question caching and preloading state
  const [questionCache, setQuestionCache] = useState<{[subject: string]: Question[]}>({});
  const [isPreloading, setIsPreloading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Fetch user progress on component mount
  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;
    
    try {
      const response = await fetch(`/api/user-progress?uid=${user.uid}&leaderboard=true`);
      const data = await response.json();
      
      if (data.success) {
        setUserProgress(data.data.user);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  // Preload questions for better performance
  const preloadQuestions = async (subject: string, retryCount = 0) => {
    if (questionCache[subject] && questionCache[subject].length > 0) {
      return; // Already cached
    }

    setIsPreloading(true);
    try {
      const response = await fetch(`/api/questions?subject=${subject}&limit=10`);
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setQuestionCache(prev => ({
          ...prev,
          [subject]: data.data
        }));
      } else {
        console.warn('No questions found for subject:', subject);
      }
    } catch (error) {
      console.error('Error preloading questions:', error);
      // Retry once if network error
      if (retryCount < 1) {
        setTimeout(() => preloadQuestions(subject, retryCount + 1), 2000);
      }
    } finally {
      setIsPreloading(false);
    }
  };

  const fetchQuestion = async (subject: string, retryCount = 0) => {
    // Check cache first
    if (questionCache[subject] && questionCache[subject].length > currentQuestionIndex) {
      const cachedQuestion = questionCache[subject][currentQuestionIndex];
      setCurrentQuestion(cachedQuestion);
      setSelectedAnswer(null);
      setQuizResult(null);
      setShowResult(false);
      setNeedsSetup(false);
      
      // Preload more questions if running low
      if (currentQuestionIndex >= questionCache[subject].length - 3) {
        preloadQuestions(subject);
      }
      
      return;
    }

    // Fallback to API if cache is empty or exhausted
    setLoading(true);
    try {
      const response = await fetch(`/api/questions?subject=${subject}&limit=1`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data.length > 0) {
        setCurrentQuestion(data.data[0]);
        setSelectedAnswer(null);
        setQuizResult(null);
        setShowResult(false);
        setNeedsSetup(false);
        
        // Also start preloading for future questions
        preloadQuestions(subject);
      } else {
        // No questions available, show setup option
        setNeedsSetup(true);
      }
    } catch (error: any) {
      console.error('Error fetching question:', error);
      
      // Retry logic for network errors
      if (retryCount < 2 && (error.message.includes('fetch') || error.message.includes('network'))) {
        console.log(`Retrying question fetch (attempt ${retryCount + 1})...`);
        setTimeout(() => fetchQuestion(subject, retryCount + 1), 1000 * (retryCount + 1));
        return;
      }
      
      setNeedsSetup(true);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentQuestion || selectedAnswer === null || !user) return;

    const performSubmission = async (retryCount = 0): Promise<void> => {
      try {
        const response = await fetch('/api/check-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: currentQuestion.id,
            selectedAnswer,
            uid: user.uid
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success) {
          setQuizResult(data.data);
          setShowResult(true);
          
          // Update streak
          if (data.data.correct) {
            setStreakCount(prev => prev + 1);
          } else {
            setStreakCount(0);
          }
          
          // Refresh user progress
          await fetchUserProgress();
        } else {
          throw new Error(data.message || 'Failed to check answer');
        }
      } catch (error: any) {
        console.error('Error submitting answer:', error);
        
        // Retry logic for network errors
        if (retryCount < 2 && (error.message.includes('fetch') || error.message.includes('network'))) {
          console.log(`Retrying answer submission (attempt ${retryCount + 1})...`);
          setTimeout(() => performSubmission(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }
        
        alert(`Error submitting answer: ${error.message}. Please try again.`);
        throw error;
      }
    };

    setLoading(true);
    try {
      await performSubmission();
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (selectedSubject) {
      // Move to next question in cache or fetch new one
      setCurrentQuestionIndex(prev => prev + 1);
      fetchQuestion(selectedSubject);
    }
  };

  const goBackToSubjects = () => {
    setSelectedSubject(null);
    setCurrentQuestion(null);
    setQuizResult(null);
    setShowResult(false);
    setSelectedAnswer(null);
    setStreakCount(0);
    setNeedsSetup(false);
    setCurrentQuestionIndex(0);
  };

  const selectSubject = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentQuestionIndex(0);
    
    // Start preloading questions immediately
    preloadQuestions(subjectId);
    
    // Fetch first question
    fetchQuestion(subjectId);
  };

  const setupSampleData = async () => {
    setIsSettingUp(true);
    try {
      const response = await fetch('/api/setup-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup_sample_questions' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`Successfully set up ${data.data.added} sample questions! You can now start the quiz.`);
        setNeedsSetup(false);
        
        // Refresh the page to load the questions
        if (selectedSubject) {
          fetchQuestion(selectedSubject);
        }
      } else {
        throw new Error(data.message || 'Failed to setup questions');
      }
    } catch (error: any) {
      console.error('Error setting up sample data:', error);
      alert(`Error setting up questions: ${error.message}. Please check your internet connection and try again.`);
    } finally {
      setIsSettingUp(false);
    }
  };
        // Mathematics
        {
          subject: "Mathematics",
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Mathematics", 
          question: "What is the square root of 16?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 2,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Mathematics",
          question: "What is 15% of 200?",
          options: ["25", "30", "35", "40"],
          correctAnswer: 1,
          points: 15,
          difficulty: "medium"
        },
        
        // Science
        {
          subject: "Science",
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          correctAnswer: 0,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Science",
          question: "What planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Science",
          question: "Which gas makes up about 78% of Earth's atmosphere?",
          options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
          correctAnswer: 2,
          points: 15,
          difficulty: "medium"
        },
        
        // History
        {
          subject: "History",
          question: "In which year did World War II end?",
          options: ["1944", "1945", "1946", "1947"],
          correctAnswer: 1,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "History",
          question: "Who was the first President of the United States?",
          options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
          correctAnswer: 2,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "History",
          question: "The Renaissance began in which country?",
          options: ["France", "Germany", "Italy", "Spain"],
          correctAnswer: 2,
          points: 15,
          difficulty: "medium"
        },
        
        // Geography
        {
          subject: "Geography",
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Geography",
          question: "How many continents are there?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Geography",
          question: "What is the capital of Australia?",
          options: ["Sydney", "Melbourne", "Canberra", "Perth"],
          correctAnswer: 2,
          points: 15,
          difficulty: "medium"
        },
        
        // English
        {
          subject: "English",
          question: "What is the past tense of 'go'?",
          options: ["goed", "went", "gone", "going"],
          correctAnswer: 1,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "English",
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
          correctAnswer: 1,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "English",
          question: "What is a synonym for 'happy'?",
          options: ["sad", "angry", "joyful", "tired"],
          correctAnswer: 2,
          points: 10,
          difficulty: "easy"
        },
        
        // Physics
        {
          subject: "Physics",
          question: "What is the unit of electric current?",
          options: ["Volt", "Ohm", "Ampere", "Watt"],
          correctAnswer: 2,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Physics",
          question: "At what temperature does water boil at sea level?",
          options: ["90°C", "95°C", "100°C", "105°C"],
          correctAnswer: 2,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Physics",
          question: "What is the formula for force?",
          options: ["F = ma", "F = mv", "F = mg", "F = m/a"],
          correctAnswer: 0,
          points: 15,
          difficulty: "medium"
        },
        
        // Computer Science
        {
          subject: "Computer Science",
          question: "What does 'HTML' stand for?",
          options: ["High Tech Modern Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
          correctAnswer: 1,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Computer Science",
          question: "What is the binary representation of decimal 5?",
          options: ["101", "110", "111", "100"],
          correctAnswer: 0,
          points: 10,
          difficulty: "easy"
        },
        {
          subject: "Computer Science",
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: 1,
          points: 15,
          difficulty: "medium"
        }
      ];

      let successCount = 0;
      for (const question of sampleQuestions) {
        try {
          const response = await fetch('/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
          });
          
          if (response.ok) {
            successCount++;
          }
        } catch (error) {
          console.error('Error adding question:', error);
        }
      }

      if (successCount > 0) {
        setNeedsSetup(false);
        alert(`Successfully added ${successCount} sample questions across 7 subjects! You can now start playing quizzes.`);
      } else {
        alert('Failed to add sample questions. Please try again.');
      }
    } catch (error) {
      console.error('Error setting up sample data:', error);
      alert('Error setting up sample data. Please try again.');
    } finally {
      setIsSettingUp(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="text-center text-white">
          <p className="text-xl">Please sign in to access gamified quizzes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            🎮 Gamified Learning Quiz
          </h1>
          <p className="text-white/80">Play, Learn, and Earn Rewards!</p>
        </motion.div>

        {/* User Progress Bar */}
        {userProgress && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-white">
                  <div className="text-2xl font-bold">{userProgress.points} 🏆</div>
                  <div className="text-sm opacity-80">Total Points</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold">Level {userProgress.level}</div>
                  <div className="text-sm opacity-80">Current Level</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold">{streakCount} 🔥</div>
                  <div className="text-sm opacity-80">Current Streak</div>
                </div>
              </div>
              
              {userProgress.badges.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">Badges:</span>
                  {userProgress.badges.slice(0, 3).map((badge, index) => (
                    <div key={index} className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                      <span className="text-sm">🏆</span>
                    </div>
                  ))}
                  {userProgress.badges.length > 3 && (
                    <span className="text-white/60 text-sm">+{userProgress.badges.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {needsSetup ? (
            /* Setup Required */
            <motion.div
              key="setup"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🎮</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Welcome to Gamified Learning!
                </h2>
                <p className="text-gray-600 mb-6">
                  To get started, we need to set up some sample questions for you to practice with.
                  This will only take a moment!
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">📚 What you'll get:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔢</div>
                      <div className="font-medium">Mathematics</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔬</div>
                      <div className="font-medium">Science</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🏛️</div>
                      <div className="font-medium">History</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🌍</div>
                      <div className="font-medium">Geography</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">📚</div>
                      <div className="font-medium">English</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">⚛️</div>
                      <div className="font-medium">Physics</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">💻</div>
                      <div className="font-medium">Computer Science</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={setupSampleData}
                  disabled={isSettingUp}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
                >
                  {isSettingUp ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
                      Setting up questions...
                    </>
                  ) : (
                    <>
                      🚀 Setup Sample Questions
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  This will add 21 sample questions across 7 different subjects to get you started.
                </p>
              </div>
            </motion.div>
          ) : !selectedSubject ? (
            /* Subject Selection */
            <motion.div
              key="subjects"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {subjects.map((subject) => (
                <motion.div
                  key={subject.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-br ${subject.color} rounded-2xl p-6 cursor-pointer shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300`}
                  onClick={() => selectSubject(subject.id)}
                >
                  <div className="text-center text-white">
                    <div className="text-4xl mb-3">{subject.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                    
                    {userProgress?.subjects?.[subject.id] && (
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex justify-between text-sm">
                          <span>Points: {userProgress.subjects[subject.id].points}</span>
                          <span>Accuracy: {Math.round((userProgress.subjects[subject.id].correctAnswers / userProgress.subjects[subject.id].questionsAnswered) * 100) || 0}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : loading ? (
            /* Loading Skeleton */
            <QuestionSkeletonLoader />
          ) : isPreloading ? (
            /* Preloading State */
            <LoadingProgress message="Loading Questions" isPreloading={true} />
          ) : currentQuestion ? (
            /* Quiz Interface */
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goBackToSubjects}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Back to Subjects
                </button>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {subjects.find(s => s.id === selectedSubject)?.name}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentQuestion.points} points
                  </span>
                  {/* Preloading indicator */}
                  {isPreloading && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <div className="animate-spin rounded-full h-3 w-3 border border-yellow-600 border-t-transparent"></div>
                      Preloading...
                    </span>
                  )}
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      showResult
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : index === selectedAnswer && index !== currentQuestion.correctAnswer
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : 'bg-gray-100 border-gray-300 text-gray-600'
                        : selectedAnswer === index
                        ? 'bg-blue-100 border-blue-500 text-blue-800'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <span className="ml-auto text-green-600">✓</span>
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <span className="ml-auto text-red-600">✗</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!showResult ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null || loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                        <span className="animate-pulse">Checking Answer...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Answer</span>
                        <span className="text-lg">🚀</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Next Question</span>
                    <span className="text-lg">➡️</span>
                  </button>
                )}
              </div>

              {/* Result Display */}
              {showResult && quizResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-6 rounded-xl ${
                    quizResult.correct 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {quizResult.correct ? '🎉' : '😅'}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      quizResult.correct ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {quizResult.correct ? 'Correct!' : 'Incorrect'}
                    </h3>
                    <p className={`mb-4 ${
                      quizResult.correct ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {quizResult.explanation}
                    </p>
                    
                    <div className="flex justify-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-lg">+{quizResult.points}</div>
                        <div className="text-gray-600">Points Earned</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{quizResult.totalPoints}</div>
                        <div className="text-gray-600">Total Points</div>
                      </div>
                    </div>

                    {/* Level Up & Badges */}
                    {(quizResult.newLevel || (quizResult.newBadges && quizResult.newBadges.length > 0)) && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        {quizResult.newLevel && (
                          <div className="text-center mb-2">
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                              🎊 Level Up! Now Level {quizResult.newLevel}
                            </span>
                          </div>
                        )}
                        {quizResult.newBadges && quizResult.newBadges.length > 0 && (
                          <div className="text-center">
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">
                              🏆 New Badge{quizResult.newBadges.length > 1 ? 's' : ''} Earned!
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : loading ? (
            /* Loading State */
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
              <p className="text-xl">Loading your quiz...</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamifiedQuiz;