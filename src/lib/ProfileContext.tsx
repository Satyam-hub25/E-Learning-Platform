'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

interface StudentProfile {
  // Personal Information
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  
  // Academic Information
  currentClass: string;
  previousClass: string;
  school: string;
  board: string;
  
  // Location Information
  state: string;
  district: string;
  village: string;
  pincode: string;
  
  // Learning Preferences
  preferredLanguage: string;
  subjects: string[];
  learningStyle: string;
  difficultyLevel: string;
  
  // Family Information
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  familyIncome: string;
  
  // Contact Information
  phoneNumber: string;
  email: string;
  parentPhoneNumber: string;
  
  // Educational Goals
  careerInterest: string[];
  studyGoals: string[];
  challengeAreas: string[];
  
  // Technology Access
  deviceType: string;
  internetConnectivity: string;
  studyTime: string;
}

interface ProfileContextType {
  profile: StudentProfile | null;
  isProfileComplete: boolean;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  getPersonalizedContent: () => PersonalizedContent;
  getRecommendedSubjects: () => string[];
  getDifficultyLevel: () => string;
  getPreferredLanguage: () => string;
  refreshProfile: () => void;
}

interface PersonalizedContent {
  welcomeMessage: string;
  recommendedGames: string[];
  studyPlan: string[];
  motivationalQuote: string;
  nextSteps: string[];
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = () => {
    try {
      const savedProfile = localStorage.getItem(`profile_${user?.uid}`);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setIsProfileComplete(isProfileCompleteCheck(parsedProfile));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const isProfileCompleteCheck = (profileData: Partial<StudentProfile>): boolean => {
    const requiredFields = [
      'fullName', 'currentClass', 'preferredLanguage', 'state', 'subjects'
    ];
    return requiredFields.every(field => 
      profileData[field as keyof StudentProfile] && 
      (Array.isArray(profileData[field as keyof StudentProfile]) 
        ? (profileData[field as keyof StudentProfile] as any[]).length > 0 
        : true)
    );
  };

  const updateProfile = (updatedProfile: Partial<StudentProfile>) => {
    if (!user) return;
    
    const newProfile = { ...profile, ...updatedProfile } as StudentProfile;
    setProfile(newProfile);
    setIsProfileComplete(isProfileCompleteCheck(newProfile));
    
    try {
      localStorage.setItem(`profile_${user.uid}`, JSON.stringify(newProfile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const refreshProfile = () => {
    loadProfile();
  };

  const getPersonalizedContent = (): PersonalizedContent => {
    if (!profile) {
      return {
        welcomeMessage: "Welcome to our learning platform!",
        recommendedGames: ['Quiz Game', 'Memory Game'],
        studyPlan: ['Complete your profile to get personalized recommendations'],
        motivationalQuote: "Learning is a treasure that will follow its owner everywhere.",
        nextSteps: ['Complete your profile setup']
      };
    }

    const classLevel = parseInt(profile.currentClass?.match(/\d+/)?.[0] || '5');
    const isHighSchool = classLevel >= 9;
    
    return {
      welcomeMessage: `Hello ${profile.fullName}! Ready for ${profile.currentClass} studies today?`,
      recommendedGames: getRecommendedGames(),
      studyPlan: getPersonalizedStudyPlan(),
      motivationalQuote: getMotivationalQuote(),
      nextSteps: getNextSteps()
    };
  };

  const getRecommendedGames = (): string[] => {
    if (!profile) return ['Quiz Game', 'Memory Game'];
    
    const games = [];
    const classLevel = parseInt(profile.currentClass?.match(/\d+/)?.[0] || '5');
    
    // Based on subjects
    if (profile.subjects?.includes('Mathematics')) {
      games.push('Number Guessing Game', 'Math Quiz');
    }
    if (profile.subjects?.includes('Science')) {
      games.push('Science Quiz', 'Farming Simulation');
    }
    if (profile.subjects?.includes('English') || profile.subjects?.includes('Hindi')) {
      games.push('Vocabulary Game', 'Memory Game');
    }
    
    // Based on class level
    if (classLevel <= 5) {
      games.push('Basic Quiz Game', 'Fun Memory Game');
    } else if (classLevel <= 8) {
      games.push('Advanced Quiz', 'Subject-based Games');
    } else {
      games.push('Competitive Quiz', 'Career-focused Games');
    }
    
    // Based on learning style
    if (profile.learningStyle === 'visual') {
      games.push('Memory Game', 'Visual Puzzles');
    } else if (profile.learningStyle === 'kinesthetic') {
      games.push('Farming Game', 'Interactive Simulations');
    }
    
    return Array.from(new Set(games)).slice(0, 4); // Remove duplicates and limit to 4
  };

  const getPersonalizedStudyPlan = (): string[] => {
    if (!profile) return ['Complete your profile for personalized study plan'];
    
    const plan = [];
    const classLevel = parseInt(profile.currentClass?.match(/\d+/)?.[0] || '5');
    
    // Morning routine
    plan.push(`🌅 Start with ${profile.subjects?.[0] || 'your favorite subject'} for 30 minutes`);
    
    // Based on challenge areas
    if (profile.challengeAreas?.includes('Mathematics')) {
      plan.push('📐 Extra practice with math problems and number games');
    }
    if (profile.challengeAreas?.includes('English')) {
      plan.push('📚 Daily vocabulary building and reading practice');
    }
    if (profile.challengeAreas?.includes('Memory')) {
      plan.push('🧠 Memory games and techniques practice');
    }
    
    // Based on study time
    const studyHours = profile.studyTime?.match(/\d+/)?.[0] || '2';
    plan.push(`⏰ Study for ${studyHours} hours with 15-minute breaks every hour`);
    
    // Based on career interests
    if (profile.careerInterest?.includes('Engineering')) {
      plan.push('🔧 Focus on Physics and Mathematics for engineering preparation');
    }
    if (profile.careerInterest?.includes('Medicine')) {
      plan.push('🩺 Strengthen Biology and Chemistry concepts');
    }
    if (profile.careerInterest?.includes('Agriculture')) {
      plan.push('🌾 Practice farming simulation and biology concepts');
    }
    
    // Evening routine
    plan.push('🌙 End day with light revision and tomorrow\'s planning');
    
    return plan;
  };

  const getMotivationalQuote = (): string => {
    if (!profile) return "Education is the most powerful weapon you can use to change the world.";
    
    const quotes = {
      'Engineering': "Innovation distinguishes between a leader and a follower. - Steve Jobs",
      'Medicine': "The good physician treats the disease; the great physician treats the patient. - William Osler",
      'Agriculture': "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways.",
      'Teaching': "A teacher affects eternity; they can never tell where their influence stops. - Henry Adams",
      'default': "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer"
    };
    
    const primaryCareer = profile.careerInterest?.[0];
    return quotes[primaryCareer as keyof typeof quotes] || quotes.default;
  };

  const getNextSteps = (): string[] => {
    if (!profile) return ['Complete your profile setup'];
    
    const steps = [];
    const classLevel = parseInt(profile.currentClass?.match(/\d+/)?.[0] || '5');
    
    // Based on study goals
    if (profile.studyGoals?.includes('Improve Grades')) {
      steps.push('📈 Take practice tests in weak subjects');
    }
    if (profile.studyGoals?.includes('Prepare for Competition')) {
      steps.push('🏆 Practice competitive exam questions');
    }
    
    // Based on class level
    if (classLevel >= 10) {
      steps.push('🎯 Focus on board exam preparation');
    }
    if (classLevel >= 11) {
      steps.push('🎓 Explore entrance exam preparation');
    }
    
    // Based on device and connectivity
    if (profile.internetConnectivity === 'poor') {
      steps.push('📱 Download offline content for uninterrupted learning');
    }
    
    // General recommendations
    steps.push('🎮 Play educational games for fun learning');
    steps.push('👥 Join study groups with classmates');
    
    return steps.slice(0, 4); // Limit to 4 steps
  };

  const getRecommendedSubjects = (): string[] => {
    if (!profile?.subjects) return [];
    return profile.subjects;
  };

  const getDifficultyLevel = (): string => {
    return profile?.difficultyLevel || 'intermediate';
  };

  const getPreferredLanguage = (): string => {
    return profile?.preferredLanguage || 'Hindi';
  };

  const contextValue: ProfileContextType = {
    profile,
    isProfileComplete,
    updateProfile,
    getPersonalizedContent,
    getRecommendedSubjects,
    getDifficultyLevel,
    getPreferredLanguage,
    refreshProfile
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};