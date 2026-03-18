"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/AuthContext';
import { useProfile } from '../../lib/ProfileContext';
import PersonalizedQuiz from '../quiz/PersonalizedQuiz';
import { QuestionSkeleton as QuestionSkeletonLoader } from '../ui/SkeletonLoader';

// Comprehensive question dataset - 15 questions per subject
const MOCK_QUESTIONS = [
  // Mathematics Questions
  { id: 'math-1', subject: 'mathematics', question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: 1, points: 10 },
  { id: 'math-2', subject: 'mathematics', question: 'What is 3 × 3?', options: ['6', '9', '12', '15'], correctAnswer: 1, points: 10 },
  { id: 'math-3', subject: 'mathematics', question: 'What is 10 - 3?', options: ['6', '7', '8', '9'], correctAnswer: 1, points: 10 },
  { id: 'math-4', subject: 'mathematics', question: 'What is 8 ÷ 2?', options: ['2', '4', '6', '8'], correctAnswer: 1, points: 10 },
  { id: 'math-5', subject: 'mathematics', question: 'What is 5 + 5?', options: ['8', '10', '12', '15'], correctAnswer: 1, points: 10 },
  { id: 'math-6', subject: 'mathematics', question: 'What is 6 × 2?', options: ['10', '12', '14', '16'], correctAnswer: 1, points: 10 },
  { id: 'math-7', subject: 'mathematics', question: 'What is 15 ÷ 3?', options: ['3', '4', '5', '6'], correctAnswer: 2, points: 10 },
  { id: 'math-8', subject: 'mathematics', question: 'What is 7 + 8?', options: ['14', '15', '16', '17'], correctAnswer: 1, points: 10 },
  { id: 'math-9', subject: 'mathematics', question: 'What is 4 × 4?', options: ['12', '14', '16', '18'], correctAnswer: 2, points: 10 },
  { id: 'math-10', subject: 'mathematics', question: 'What is 20 - 5?', options: ['13', '14', '15', '16'], correctAnswer: 2, points: 10 },
  { id: 'math-11', subject: 'mathematics', question: 'What is 9 + 6?', options: ['14', '15', '16', '17'], correctAnswer: 1, points: 10 },
  { id: 'math-12', subject: 'mathematics', question: 'What is 12 ÷ 4?', options: ['2', '3', '4', '5'], correctAnswer: 1, points: 10 },
  { id: 'math-13', subject: 'mathematics', question: 'What is 5 × 5?', options: ['20', '25', '30', '35'], correctAnswer: 1, points: 10 },
  { id: 'math-14', subject: 'mathematics', question: 'What is 18 - 9?', options: ['7', '8', '9', '10'], correctAnswer: 2, points: 10 },
  { id: 'math-15', subject: 'mathematics', question: 'What is 7 × 3?', options: ['18', '20', '21', '24'], correctAnswer: 2, points: 10 },

  // Science Questions
  { id: 'sci-1', subject: 'science', question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'O2', 'H2'], correctAnswer: 0, points: 10 },
  { id: 'sci-2', subject: 'science', question: 'How many bones are in the human body?', options: ['196', '206', '216', '226'], correctAnswer: 1, points: 10 },
  { id: 'sci-3', subject: 'science', question: 'What planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correctAnswer: 1, points: 10 },
  { id: 'sci-4', subject: 'science', question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, points: 10 },
  { id: 'sci-5', subject: 'science', question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond', 'Silver'], correctAnswer: 2, points: 10 },
  { id: 'sci-6', subject: 'science', question: 'How many chambers does a human heart have?', options: ['2', '3', '4', '5'], correctAnswer: 2, points: 10 },
  { id: 'sci-7', subject: 'science', question: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '200,000 km/s'], correctAnswer: 0, points: 10 },
  { id: 'sci-8', subject: 'science', question: 'What is the largest organ in the human body?', options: ['Brain', 'Liver', 'Skin', 'Heart'], correctAnswer: 2, points: 10 },
  { id: 'sci-9', subject: 'science', question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 2, points: 10 },
  { id: 'sci-10', subject: 'science', question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], correctAnswer: 1, points: 10 },
  { id: 'sci-11', subject: 'science', question: 'What is the boiling point of water?', options: ['90°C', '100°C', '110°C', '120°C'], correctAnswer: 1, points: 10 },
  { id: 'sci-12', subject: 'science', question: 'What is the smallest unit of matter?', options: ['Molecule', 'Atom', 'Cell', 'Electron'], correctAnswer: 1, points: 10 },
  { id: 'sci-13', subject: 'science', question: 'Which blood type is the universal donor?', options: ['A', 'B', 'AB', 'O'], correctAnswer: 3, points: 10 },
  { id: 'sci-14', subject: 'science', question: 'What is the main gas in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correctAnswer: 2, points: 10 },
  { id: 'sci-15', subject: 'science', question: 'How long does light from the Sun take to reach Earth?', options: ['8 minutes', '8 hours', '8 days', '8 seconds'], correctAnswer: 0, points: 10 },

  // History Questions
  { id: 'hist-1', subject: 'history', question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], correctAnswer: 1, points: 10 },
  { id: 'hist-2', subject: 'history', question: 'In which year did World War II end?', options: ['1944', '1945', '1946', '1947'], correctAnswer: 1, points: 10 },
  { id: 'hist-3', subject: 'history', question: 'Who built the first car?', options: ['Henry Ford', 'Karl Benz', 'Thomas Edison', 'Wright Brothers'], correctAnswer: 1, points: 10 },
  { id: 'hist-4', subject: 'history', question: 'The Great Wall of China was built to protect against which group?', options: ['Mongols', 'Japanese', 'British', 'Russians'], correctAnswer: 0, points: 10 },
  { id: 'hist-5', subject: 'history', question: 'Who painted the Mona Lisa?', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'], correctAnswer: 2, points: 10 },
  { id: 'hist-6', subject: 'history', question: 'In which year did the Titanic sink?', options: ['1910', '1911', '1912', '1913'], correctAnswer: 2, points: 10 },
  { id: 'hist-7', subject: 'history', question: 'Who was the first person to walk on the moon?', options: ['Buzz Aldrin', 'Neil Armstrong', 'John Glenn', 'Yuri Gagarin'], correctAnswer: 1, points: 10 },
  { id: 'hist-8', subject: 'history', question: 'The ancient city of Troy was located in which modern country?', options: ['Greece', 'Italy', 'Turkey', 'Egypt'], correctAnswer: 2, points: 10 },
  { id: 'hist-9', subject: 'history', question: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'], correctAnswer: 1, points: 10 },
  { id: 'hist-10', subject: 'history', question: 'The French Revolution began in which year?', options: ['1789', '1799', '1809', '1819'], correctAnswer: 0, points: 10 },
  { id: 'hist-11', subject: 'history', question: 'Who was known as the "Iron Lady"?', options: ['Queen Elizabeth II', 'Margaret Thatcher', 'Princess Diana', 'Indira Gandhi'], correctAnswer: 1, points: 10 },
  { id: 'hist-12', subject: 'history', question: 'The Berlin Wall fell in which year?', options: ['1987', '1988', '1989', '1990'], correctAnswer: 2, points: 10 },
  { id: 'hist-13', subject: 'history', question: 'Who discovered America?', options: ['Vasco da Gama', 'Christopher Columbus', 'Ferdinand Magellan', 'Marco Polo'], correctAnswer: 1, points: 10 },
  { id: 'hist-14', subject: 'history', question: 'The Renaissance period originated in which country?', options: ['France', 'Germany', 'Italy', 'Spain'], correctAnswer: 2, points: 10 },
  { id: 'hist-15', subject: 'history', question: 'Who was the longest-reigning British monarch?', options: ['Queen Victoria', 'Queen Elizabeth II', 'King George III', 'King Henry VIII'], correctAnswer: 1, points: 10 },

  // Geography Questions
  { id: 'geo-1', subject: 'geography', question: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correctAnswer: 2, points: 10 },
  { id: 'geo-2', subject: 'geography', question: 'Which is the largest ocean?', options: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correctAnswer: 1, points: 10 },
  { id: 'geo-3', subject: 'geography', question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correctAnswer: 1, points: 10 },
  { id: 'geo-4', subject: 'geography', question: 'Which mountain range contains Mount Everest?', options: ['Andes', 'Rockies', 'Alps', 'Himalayas'], correctAnswer: 3, points: 10 },
  { id: 'geo-5', subject: 'geography', question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1, points: 10 },
  { id: 'geo-6', subject: 'geography', question: 'Which desert is the largest in the world?', options: ['Sahara', 'Gobi', 'Kalahari', 'Antarctic'], correctAnswer: 3, points: 10 },
  { id: 'geo-7', subject: 'geography', question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2, points: 10 },
  { id: 'geo-8', subject: 'geography', question: 'Which continent has the most countries?', options: ['Asia', 'Africa', 'Europe', 'South America'], correctAnswer: 1, points: 10 },
  { id: 'geo-9', subject: 'geography', question: 'The Amazon rainforest is primarily in which country?', options: ['Colombia', 'Peru', 'Brazil', 'Venezuela'], correctAnswer: 2, points: 10 },
  { id: 'geo-10', subject: 'geography', question: 'What is the highest waterfall in the world?', options: ['Niagara Falls', 'Victoria Falls', 'Angel Falls', 'Iguazu Falls'], correctAnswer: 2, points: 10 },
  { id: 'geo-11', subject: 'geography', question: 'Which country has the most time zones?', options: ['Russia', 'United States', 'China', 'Canada'], correctAnswer: 0, points: 10 },
  { id: 'geo-12', subject: 'geography', question: 'What is the deepest ocean trench?', options: ['Puerto Rico Trench', 'Mariana Trench', 'Java Trench', 'Peru-Chile Trench'], correctAnswer: 1, points: 10 },
  { id: 'geo-13', subject: 'geography', question: 'Which African country is completely surrounded by South Africa?', options: ['Botswana', 'Lesotho', 'Swaziland', 'Zimbabwe'], correctAnswer: 1, points: 10 },
  { id: 'geo-14', subject: 'geography', question: 'The Suez Canal connects which two bodies of water?', options: ['Red Sea and Mediterranean', 'Persian Gulf and Arabian Sea', 'Black Sea and Caspian Sea', 'Atlantic and Pacific'], correctAnswer: 0, points: 10 },
  { id: 'geo-15', subject: 'geography', question: 'Which is the most populous city in the world?', options: ['Shanghai', 'Tokyo', 'Delhi', 'São Paulo'], correctAnswer: 1, points: 10 },

  // English Questions
  { id: 'eng-1', subject: 'english', question: 'What is the plural of "child"?', options: ['childs', 'children', 'childrens', 'child'], correctAnswer: 1, points: 10 },
  { id: 'eng-2', subject: 'english', question: 'Which word is a synonym for "happy"?', options: ['sad', 'joyful', 'angry', 'tired'], correctAnswer: 1, points: 10 },
  { id: 'eng-3', subject: 'english', question: 'What is the past tense of "go"?', options: ['goed', 'went', 'gone', 'going'], correctAnswer: 1, points: 10 },
  { id: 'eng-4', subject: 'english', question: 'Which of these is a proper noun?', options: ['city', 'London', 'building', 'river'], correctAnswer: 1, points: 10 },
  { id: 'eng-5', subject: 'english', question: 'What type of word is "quickly"?', options: ['noun', 'verb', 'adjective', 'adverb'], correctAnswer: 3, points: 10 },
  { id: 'eng-6', subject: 'english', question: 'Which sentence is correct?', options: ['She don\'t like pizza', 'She doesn\'t like pizza', 'She not like pizza', 'She no like pizza'], correctAnswer: 1, points: 10 },
  { id: 'eng-7', subject: 'english', question: 'What is the superlative form of "good"?', options: ['gooder', 'goodest', 'better', 'best'], correctAnswer: 3, points: 10 },
  { id: 'eng-8', subject: 'english', question: 'Which word is spelled correctly?', options: ['recieve', 'receive', 'receve', 'receeve'], correctAnswer: 1, points: 10 },
  { id: 'eng-9', subject: 'english', question: 'What is the opposite of "begin"?', options: ['start', 'end', 'continue', 'pause'], correctAnswer: 1, points: 10 },
  { id: 'eng-10', subject: 'english', question: 'Which is the correct possessive form?', options: ['the dogs bone', 'the dog\'s bone', 'the dogs\' bone', 'the dog bone'], correctAnswer: 1, points: 10 },
  { id: 'eng-11', subject: 'english', question: 'What is a group of words that expresses a complete thought?', options: ['phrase', 'clause', 'sentence', 'paragraph'], correctAnswer: 2, points: 10 },
  { id: 'eng-12', subject: 'english', question: 'Which word is an antonym for "ancient"?', options: ['old', 'modern', 'historic', 'traditional'], correctAnswer: 1, points: 10 },
  { id: 'eng-13', subject: 'english', question: 'What is the comparative form of "bad"?', options: ['badder', 'worse', 'worst', 'more bad'], correctAnswer: 1, points: 10 },
  { id: 'eng-14', subject: 'english', question: 'Which punctuation mark ends a question?', options: ['period', 'exclamation mark', 'question mark', 'comma'], correctAnswer: 2, points: 10 },
  { id: 'eng-15', subject: 'english', question: 'What is the present participle of "run"?', options: ['ran', 'running', 'runs', 'runned'], correctAnswer: 1, points: 10 },

  // Physics Questions
  { id: 'phys-1', subject: 'physics', question: 'What is the formula for force?', options: ['F = ma', 'F = mv', 'F = mc²', 'F = mgh'], correctAnswer: 0, points: 10 },
  { id: 'phys-2', subject: 'physics', question: 'What is the unit of electric current?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correctAnswer: 1, points: 10 },
  { id: 'phys-3', subject: 'physics', question: 'What is the speed of sound in air?', options: ['300 m/s', '343 m/s', '400 m/s', '500 m/s'], correctAnswer: 1, points: 10 },
  { id: 'phys-4', subject: 'physics', question: 'Who discovered the law of gravity?', options: ['Einstein', 'Newton', 'Galileo', 'Kepler'], correctAnswer: 1, points: 10 },
  { id: 'phys-5', subject: 'physics', question: 'What is the unit of energy?', options: ['Joule', 'Newton', 'Pascal', 'Hertz'], correctAnswer: 0, points: 10 },
  { id: 'phys-6', subject: 'physics', question: 'What happens to wavelength when frequency increases?', options: ['Increases', 'Decreases', 'Stays the same', 'Doubles'], correctAnswer: 1, points: 10 },
  { id: 'phys-7', subject: 'physics', question: 'What is the acceleration due to gravity on Earth?', options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'], correctAnswer: 0, points: 10 },
  { id: 'phys-8', subject: 'physics', question: 'Which color has the longest wavelength?', options: ['Red', 'Blue', 'Green', 'Violet'], correctAnswer: 0, points: 10 },
  { id: 'phys-9', subject: 'physics', question: 'What is the unit of power?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 1, points: 10 },
  { id: 'phys-10', subject: 'physics', question: 'What is the first law of thermodynamics?', options: ['Energy cannot be created or destroyed', 'Force equals mass times acceleration', 'Every action has an equal reaction', 'Objects at rest stay at rest'], correctAnswer: 0, points: 10 },
  { id: 'phys-11', subject: 'physics', question: 'What type of wave is sound?', options: ['Electromagnetic', 'Longitudinal', 'Transverse', 'Standing'], correctAnswer: 1, points: 10 },
  { id: 'phys-12', subject: 'physics', question: 'What is the unit of frequency?', options: ['Hertz', 'Watt', 'Joule', 'Newton'], correctAnswer: 0, points: 10 },
  { id: 'phys-13', subject: 'physics', question: 'What is the speed of light in vacuum?', options: ['3 × 10⁸ m/s', '2 × 10⁸ m/s', '4 × 10⁸ m/s', '5 × 10⁸ m/s'], correctAnswer: 0, points: 10 },
  { id: 'phys-14', subject: 'physics', question: 'What is Ohm\'s law?', options: ['V = IR', 'F = ma', 'E = mc²', 'P = IV'], correctAnswer: 0, points: 10 },
  { id: 'phys-15', subject: 'physics', question: 'What is the unit of resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correctAnswer: 2, points: 10 },

  // Computer Science Questions
  { id: 'cs-1', subject: 'computer science', question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'], correctAnswer: 0, points: 10 },
  { id: 'cs-2', subject: 'computer science', question: 'Which programming language is known as the "language of the web"?', options: ['Python', 'Java', 'JavaScript', 'C++'], correctAnswer: 2, points: 10 },
  { id: 'cs-3', subject: 'computer science', question: 'What does CPU stand for?', options: ['Computer Processing Unit', 'Central Processing Unit', 'Central Program Unit', 'Computer Program Unit'], correctAnswer: 1, points: 10 },
  { id: 'cs-4', subject: 'computer science', question: 'Which of these is a database management system?', options: ['Photoshop', 'MySQL', 'Chrome', 'Windows'], correctAnswer: 1, points: 10 },
  { id: 'cs-5', subject: 'computer science', question: 'What does URL stand for?', options: ['Universal Resource Locator', 'Uniform Resource Locator', 'Universal Reference Link', 'Uniform Reference Locator'], correctAnswer: 1, points: 10 },
  { id: 'cs-6', subject: 'computer science', question: 'Which company developed the Java programming language?', options: ['Microsoft', 'Apple', 'Sun Microsystems', 'Google'], correctAnswer: 2, points: 10 },
  { id: 'cs-7', subject: 'computer science', question: 'What is the binary representation of the decimal number 8?', options: ['1000', '1010', '1100', '1110'], correctAnswer: 0, points: 10 },
  { id: 'cs-8', subject: 'computer science', question: 'Which protocol is used for secure web browsing?', options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'], correctAnswer: 1, points: 10 },
  { id: 'cs-9', subject: 'computer science', question: 'What does RAM stand for?', options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Remote Access Memory'], correctAnswer: 0, points: 10 },
  { id: 'cs-10', subject: 'computer science', question: 'Which of these is an example of an operating system?', options: ['Microsoft Word', 'Google Chrome', 'Windows 10', 'Adobe Photoshop'], correctAnswer: 2, points: 10 },
  { id: 'cs-11', subject: 'computer science', question: 'What is the maximum value that can be stored in 8 bits?', options: ['127', '255', '256', '128'], correctAnswer: 1, points: 10 },
  { id: 'cs-12', subject: 'computer science', question: 'Which programming paradigm does Python support?', options: ['Only procedural', 'Only object-oriented', 'Both procedural and object-oriented', 'Only functional'], correctAnswer: 2, points: 10 },
  { id: 'cs-13', subject: 'computer science', question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Structured Question Language'], correctAnswer: 0, points: 10 },
  { id: 'cs-14', subject: 'computer science', question: 'Which data structure follows LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correctAnswer: 1, points: 10 },
  { id: 'cs-15', subject: 'computer science', question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, points: 10 }
];

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

interface QuizSummary {
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  accuracy: number;
  grade: string;
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

const QUIZ_LENGTH = 10;

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
  
  // Quiz state management
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const [quizSummary, setQuizSummary] = useState<QuizSummary | null>(null);

  // Fetch user progress on component mount
  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;
    
    try {
      // Mock user progress data
      const mockProgress: UserProgress = {
        points: 1250,
        level: 5,
        badges: ['First Quiz', 'Mathematics Expert', 'Speed Runner'],
        totalQuestionsAnswered: 45,
        correctAnswers: 38,
        subjects: {
          mathematics: { points: 450, questionsAnswered: 15, correctAnswers: 12 },
          science: { points: 380, questionsAnswered: 12, correctAnswers: 10 },
          history: { points: 220, questionsAnswered: 8, correctAnswers: 6 },
          geography: { points: 200, questionsAnswered: 10, correctAnswers: 10 }
        }
      };
      setUserProgress(mockProgress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  // Load quiz questions for selected subject
  const loadQuizQuestions = async (subject: string, retryCount = 0) => {
    setIsPreloading(true);
    setLoading(true);
    
    try {
      // Use local mock data instead of API to avoid corruption issues
      const filteredQuestions = MOCK_QUESTIONS.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
      
      if (filteredQuestions.length >= QUIZ_LENGTH) {
        // Shuffle questions to ensure randomness and prevent repetition
        const shuffledQuestions = [...filteredQuestions].sort(() => Math.random() - 0.5);
        const uniqueQuestions = shuffledQuestions.slice(0, QUIZ_LENGTH);
        
        setQuizQuestions(uniqueQuestions);
        setCurrentQuestion(uniqueQuestions[0]);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setQuizCompleted(false);
        setFinalScore(0);
        setSelectedAnswer(null);
        setQuizResult(null);
        setShowResult(false);
        setNeedsSetup(false);
        setQuizSummary(null);
      } else {
        console.warn(`Not enough questions for ${subject}. Found: ${filteredQuestions.length}, Need: ${QUIZ_LENGTH}`);
        setNeedsSetup(true);
      }
    } catch (error: any) {
      console.error('Error loading quiz questions:', error);
      setNeedsSetup(true);
    } finally {
      setLoading(false);
      setIsPreloading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentQuestion || selectedAnswer === null || !user) return;

    setLoading(true);
    
    // Store the user's answer
    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);
    
    // Check if answer is correct
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    // Calculate points for this question
    const questionPoints = isCorrect ? currentQuestion.points : 0;
    
    // Create quiz result for this question
    const result: QuizResult = {
      correct: isCorrect,
      points: questionPoints,
      totalPoints: finalScore + questionPoints,
      correctAnswer: currentQuestion.correctAnswer,
      explanation: isCorrect 
        ? `Correct! Well done! You earned ${currentQuestion.points} points.`
        : `Incorrect. The correct answer was "${currentQuestion.options[currentQuestion.correctAnswer]}".`
    };
    
    setQuizResult(result);
    setShowResult(true);
    
    // Update streak and score
    if (isCorrect) {
      setStreakCount(prev => prev + 1);
      setFinalScore(prev => prev + questionPoints);
    } else {
      setStreakCount(0);
    }
    
    setLoading(false);
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < QUIZ_LENGTH && nextIndex < quizQuestions.length) {
      // Continue to next question
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(quizQuestions[nextIndex]);
      setSelectedAnswer(null);
      setQuizResult(null);
      setShowResult(false);
    } else {
      // Quiz completed - calculate final results
      const correctCount = userAnswers.filter((answer, index) => 
        answer === quizQuestions[index]?.correctAnswer
      ).length + (quizResult?.correct ? 1 : 0);
      
      const accuracy = Math.round((correctCount / QUIZ_LENGTH) * 100);
      let grade = 'F';
      if (accuracy >= 90) grade = 'A+';
      else if (accuracy >= 80) grade = 'A';
      else if (accuracy >= 70) grade = 'B';
      else if (accuracy >= 60) grade = 'C';
      else if (accuracy >= 50) grade = 'D';
      
      setQuizSummary({
        totalQuestions: QUIZ_LENGTH,
        correctAnswers: correctCount,
        totalPoints: finalScore + (quizResult?.points || 0),
        accuracy,
        grade
      });
      
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    if (selectedSubject) {
      loadQuizQuestions(selectedSubject);
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
    setQuizQuestions([]);
    setUserAnswers([]);
    setQuizCompleted(false);
    setFinalScore(0);
    setQuizSummary(null);
  };

  const selectSubject = (subjectId: string) => {
    setSelectedSubject(subjectId);
    loadQuizQuestions(subjectId);
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
        
        // Refresh the quiz
        if (selectedSubject) {
          loadQuizQuestions(selectedSubject);
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to access the gamified quiz system.</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {quizCompleted && quizSummary ? (
            /* Final Results */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center"
            >
              <div className="text-6xl mb-6">🎯</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-blue-600">{quizSummary.correctAnswers}</div>
                  <div className="text-sm text-blue-800">Correct</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-green-600">{quizSummary.accuracy}%</div>
                  <div className="text-sm text-green-800">Accuracy</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-purple-600">{quizSummary.totalPoints}</div>
                  <div className="text-sm text-purple-800">Points</div>
                </div>
                <div className="bg-orange-50 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-orange-600">{quizSummary.grade}</div>
                  <div className="text-sm text-orange-800">Grade</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-lg mb-2">Performance</div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${quizSummary.accuracy}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {quizSummary.correctAnswers} out of {quizSummary.totalQuestions} questions correct
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={restartQuiz}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={goBackToSubjects}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  📚 Choose New Subject
                </button>
              </div>
            </motion.div>
          ) : needsSetup ? (
            /* Setup Required */
            <motion.div
              key="setup"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center"
            >
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Setup Required</h2>
              <p className="text-gray-600 mb-8">No questions found for this subject. Let's set up some sample questions to get started!</p>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Sample Questions Include:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="text-center">
                      <div className="text-2xl mb-1">{subject.icon}</div>
                      <div className="font-medium">{subject.name}</div>
                    </div>
                  ))}
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
                This will add sample questions across different subjects to get you started.
              </p>
            </motion.div>
          ) : !selectedSubject ? (
            /* Subject Selection with Personalized Quiz */
            <motion.div
              key="subjects"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">🎮 Gamified Quiz Challenge</h1>
                <p className="text-white/80 text-lg">Choose a subject and test your knowledge with 10 unique questions!</p>
              </div>
              
              {/* Personalized Quiz Component */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
                <PersonalizedQuiz onStartQuiz={(subject, difficulty) => selectSubject(subject.toLowerCase())} />
              </div>
              
              {/* Original Subject Grid */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Or Choose Any Subject</h2>
                <p className="text-white/70">Browse all available subjects</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <p className="text-sm opacity-90 mb-4">10 Questions • Mixed Difficulty</p>
                      
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
              </div>
            </motion.div>
          ) : loading || isPreloading ? (
            /* Loading */
            <LoadingProgress message="Loading Quiz Questions" isPreloading={isPreloading} />
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
                    Question {currentQuestionIndex + 1}/{QUIZ_LENGTH}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentQuestion.points} points
                  </span>
                  {streakCount > 1 && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      🔥 {streakCount} streak
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / QUIZ_LENGTH) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex + 1) / QUIZ_LENGTH) * 100}%` }}
                  ></div>
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
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                        <span>Checking Answer...</span>
                      </div>
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
                    <span>{currentQuestionIndex + 1 >= QUIZ_LENGTH ? 'View Results' : 'Next Question'}</span>
                    <span className="text-lg">{currentQuestionIndex + 1 >= QUIZ_LENGTH ? '🎯' : '➡️'}</span>
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
                    
                    <div className="flex justify-center gap-4 text-sm">
                      <span className="bg-white/70 px-3 py-1 rounded-full">
                        Points: +{quizResult.points}
                      </span>
                      <span className="bg-white/70 px-3 py-1 rounded-full">
                        Total: {quizResult.totalPoints}
                      </span>
                      {streakCount > 1 && (
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                          Streak: {streakCount} 🔥
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Error state */
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 text-center"
            >
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-6">We couldn't load the quiz questions. Please try again.</p>
              <button 
                onClick={() => selectedSubject && loadQuizQuestions(selectedSubject)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamifiedQuiz;