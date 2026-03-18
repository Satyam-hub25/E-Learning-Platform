'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../../lib/ProfileContext';

interface PersonalizedQuizProps {
  onStartQuiz: (subject: string, difficulty: string) => void;
}

const PersonalizedQuiz: React.FC<PersonalizedQuizProps> = ({ onStartQuiz }) => {
  const { profile, getRecommendedSubjects, getDifficultyLevel } = useProfile();

  if (!profile) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-bold text-lg mb-4">Quiz Recommendations</h3>
        <p className="text-white/70">Complete your profile to get personalized quiz recommendations!</p>
        <button
          onClick={() => window.location.href = '/profile'}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Setup Profile
        </button>
      </div>
    );
  }

  const subjects = getRecommendedSubjects();
  const difficulty = getDifficultyLevel();
  const classLevel = parseInt(profile.currentClass?.match(/\d+/)?.[0] || '5');

  const getSubjectEmoji = (subject: string) => {
    const emojis: { [key: string]: string } = {
      'Mathematics': '🔢',
      'Science': '🔬',
      'English': '📚',
      'Hindi': '🇮🇳',
      'Social Science': '🌍',
      'Physics': '⚛️',
      'Chemistry': '🧪',
      'Biology': '🧬',
      'Computer Science': '💻',
      'Economics': '📊',
      'History': '📜',
      'Geography': '🗺️'
    };
    return emojis[subject] || '📖';
  };

  const getClassLevelQuizzes = () => {
    if (classLevel <= 5) {
      return [
        { name: 'Basic Math', subject: 'Mathematics', description: 'Addition, subtraction, tables' },
        { name: 'Simple Science', subject: 'Science', description: 'Plants, animals, weather' },
        { name: 'English Words', subject: 'English', description: 'Basic vocabulary and grammar' },
        { name: 'Hindi Basics', subject: 'Hindi', description: 'Letters, words, simple sentences' }
      ];
    } else if (classLevel <= 8) {
      return [
        { name: 'Pre-Algebra', subject: 'Mathematics', description: 'Fractions, decimals, basic algebra' },
        { name: 'General Science', subject: 'Science', description: 'Physics, chemistry, biology basics' },
        { name: 'English Grammar', subject: 'English', description: 'Grammar rules and comprehension' },
        { name: 'Social Studies', subject: 'Social Science', description: 'History, geography, civics' }
      ];
    } else if (classLevel <= 10) {
      return [
        { name: 'Mathematics', subject: 'Mathematics', description: 'Algebra, geometry, trigonometry' },
        { name: 'Science', subject: 'Science', description: 'Advanced physics, chemistry, biology' },
        { name: 'English Literature', subject: 'English', description: 'Literature and advanced grammar' },
        { name: 'Social Science', subject: 'Social Science', description: 'History, geography, political science' }
      ];
    } else {
      return [
        { name: 'Advanced Mathematics', subject: 'Mathematics', description: 'Calculus, statistics, complex algebra' },
        { name: 'Physics', subject: 'Physics', description: 'Mechanics, waves, electricity' },
        { name: 'Chemistry', subject: 'Chemistry', description: 'Organic, inorganic, physical chemistry' },
        { name: 'Biology', subject: 'Biology', description: 'Cell biology, genetics, ecology' }
      ];
    }
  };

  const availableQuizzes = getClassLevelQuizzes();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Quizzes for {profile.currentClass}
        </h2>
        <p className="text-white/70">
          Personalized quizzes based on your subjects and level ({difficulty})
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {availableQuizzes.map((quiz, index) => (
          <motion.div
            key={quiz.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group cursor-pointer"
            onClick={() => onStartQuiz(quiz.subject, difficulty)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{getSubjectEmoji(quiz.subject)}</div>
              <div className="text-white/40 group-hover:text-white/60 transition-colors">
                →
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">{quiz.name}</h3>
            <p className="text-white/60 text-sm mb-4">{quiz.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full text-xs">
                  {difficulty}
                </span>
                <span className="bg-green-500/20 text-green-200 px-2 py-1 rounded-full text-xs">
                  Class {classLevel}
                </span>
              </div>
              
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                Start Quiz
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subject-specific recommendations */}
      {subjects.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-4">Your Subjects</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {subjects.slice(0, 8).map((subject, index) => (
              <div
                key={subject}
                className="bg-white/10 rounded-lg p-3 text-center hover:bg-white/20 transition-all cursor-pointer"
                onClick={() => onStartQuiz(subject, difficulty)}
              >
                <div className="text-2xl mb-1">{getSubjectEmoji(subject)}</div>
                <p className="text-white text-sm font-medium">{subject}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study recommendations based on profile */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
        <h3 className="text-white font-bold text-lg mb-4">📚 Study Tips for You</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {profile.learningStyle === 'visual' && (
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">👁️ Visual Learning</h4>
              <p className="text-white/80 text-sm">Use diagrams, charts, and memory games to enhance your learning!</p>
            </div>
          )}
          
          {profile.learningStyle === 'auditory' && (
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">👂 Auditory Learning</h4>
              <p className="text-white/80 text-sm">Read aloud, discuss with friends, and use audio resources!</p>
            </div>
          )}
          
          {profile.learningStyle === 'kinesthetic' && (
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">✋ Hands-on Learning</h4>
              <p className="text-white/80 text-sm">Try interactive games, experiments, and practical activities!</p>
            </div>
          )}
          
          {profile.challengeAreas && profile.challengeAreas.length > 0 && (
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">🎯 Focus Areas</h4>
              <p className="text-white/80 text-sm">
                Extra practice recommended for: {profile.challengeAreas.slice(0, 3).join(', ')}
              </p>
            </div>
          )}
          
          {profile.careerInterest && profile.careerInterest.length > 0 && (
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">🚀 Career Path</h4>
              <p className="text-white/80 text-sm">
                Building skills for: {profile.careerInterest[0]}
              </p>
            </div>
          )}
          
          {profile.studyTime && (
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">⏰ Study Schedule</h4>
              <p className="text-white/80 text-sm">
                Daily goal: {profile.studyTime} of focused learning
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedQuiz;