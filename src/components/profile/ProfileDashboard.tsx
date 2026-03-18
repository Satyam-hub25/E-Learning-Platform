'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/AuthContext';

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
  board: string; // CBSE, ICSE, State Board 
  
  // Location Information
  state: string;
  district: string;
  village: string;
  pincode: string;
  
  // Learning Preferences
  preferredLanguage: string;
  subjects: string[];
  learningStyle: string; // visual, auditory, kinesthetic
  difficultyLevel: string; // beginner, intermediate, advanced
  
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
  deviceType: string; // smartphone, tablet, computer
  internetConnectivity: string; // good, average, poor
  studyTime: string; // hours per day
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const classes = [
  '1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class',
  '6th Class', '7th Class', '8th Class', '9th Class', '10th Class',
  '11th Class (Science)', '11th Class (Commerce)', '11th Class (Arts)',
  '12th Class (Science)', '12th Class (Commerce)', '12th Class (Arts)'
];

const subjects = [
  'Mathematics', 'Science', 'English', 'Hindi', 'Social Science', 'Sanskrit',
  'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics',
  'History', 'Geography', 'Political Science', 'Psychology', 'Sociology',
  'Accountancy', 'Business Studies', 'Physical Education', 'Art', 'Music'
];

const careerOptions = [
  'Engineering', 'Medicine', 'Teaching', 'Agriculture', 'Business', 'Government Jobs',
  'Technology', 'Arts & Design', 'Sports', 'Military', 'Research', 'Social Work',
  'Banking', 'Law', 'Journalism', 'Entertainment', 'Tourism', 'Aviation'
];

const ProfileDashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<StudentProfile>>({
    fullName: user?.displayName || '',
    email: user?.email || '',
    preferredLanguage: 'Hindi',
    subjects: [],
    careerInterest: [],
    studyGoals: [],
    challengeAreas: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  const totalSteps = 7;

  useEffect(() => {
    checkExistingProfile();
  }, [user]);

  const checkExistingProfile = async () => {
    // Check if user already has a profile
    const savedProfile = localStorage.getItem(`profile_${user?.uid}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setProfileExists(true);
    }
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage for now (can be replaced with API call)
      localStorage.setItem(`profile_${user?.uid}`, JSON.stringify(profile));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Profile saved successfully! Your learning experience will now be personalized.');
      setProfileExists(true);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof StudentProfile, value: string) => {
    setProfile(prev => {
      const currentValue = prev[field];
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">👋 Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.fullName || ''}
                  onChange={(e) => updateProfile('fullName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                  min="5"
                  max="25"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={profile.gender || ''}
                  onChange={(e) => updateProfile('gender', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={profile.dateOfBirth || ''}
                  onChange={(e) => updateProfile('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">🎓 Academic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Class</label>
                <select
                  value={profile.currentClass || ''}
                  onChange={(e) => updateProfile('currentClass', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Current Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                <input
                  type="text"
                  value={profile.school || ''}
                  onChange={(e) => updateProfile('school', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your school name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Board</label>
                <select
                  value={profile.board || ''}
                  onChange={(e) => updateProfile('board', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Class</label>
                <select
                  value={profile.previousClass || ''}
                  onChange={(e) => updateProfile('previousClass', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Previous Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">📍 Location Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={profile.state || ''}
                  onChange={(e) => updateProfile('state', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                <input
                  type="text"
                  value={profile.district || ''}
                  onChange={(e) => updateProfile('district', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your district"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village/Town</label>
                <input
                  type="text"
                  value={profile.village || ''}
                  onChange={(e) => updateProfile('village', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your village or town"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                <input
                  type="text"
                  value={profile.pincode || ''}
                  onChange={(e) => updateProfile('pincode', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter PIN code"
                  maxLength={6}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">📚 Learning Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                <select
                  value={profile.preferredLanguage || ''}
                  onChange={(e) => updateProfile('preferredLanguage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Both">Both Hindi & English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects You Study</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {subjects.map(subject => (
                    <label key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.subjects?.includes(subject) || false}
                        onChange={() => toggleArrayField('subjects', subject)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Style</label>
                <select
                  value={profile.learningStyle || ''}
                  onChange={(e) => updateProfile('learningStyle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Learning Style</option>
                  <option value="visual">Visual (Pictures, diagrams)</option>
                  <option value="auditory">Auditory (Listening, speaking)</option>
                  <option value="kinesthetic">Hands-on (Practice, activities)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Level</label>
                <select
                  value={profile.difficultyLevel || ''}
                  onChange={(e) => updateProfile('difficultyLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">👨‍👩‍👧‍👦 Family Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
                <input
                  type="text"
                  value={profile.fatherName || ''}
                  onChange={(e) => updateProfile('fatherName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter father's name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Name</label>
                <input
                  type="text"
                  value={profile.motherName || ''}
                  onChange={(e) => updateProfile('motherName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter mother's name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Occupation</label>
                <input
                  type="text"
                  value={profile.fatherOccupation || ''}
                  onChange={(e) => updateProfile('fatherOccupation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Farmer, Teacher, Business"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Occupation</label>
                <input
                  type="text"
                  value={profile.motherOccupation || ''}
                  onChange={(e) => updateProfile('motherOccupation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Housewife, Teacher, Business"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Family Income (Annual)</label>
                <select
                  value={profile.familyIncome || ''}
                  onChange={(e) => updateProfile('familyIncome', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Income Range</option>
                  <option value="Below 1 Lakh">Below ₹1 Lakh</option>
                  <option value="1-3 Lakhs">₹1-3 Lakhs</option>
                  <option value="3-5 Lakhs">₹3-5 Lakhs</option>
                  <option value="5-10 Lakhs">₹5-10 Lakhs</option>
                  <option value="Above 10 Lakhs">Above ₹10 Lakhs</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent's Phone Number</label>
                <input
                  type="tel"
                  value={profile.parentPhoneNumber || ''}
                  onChange={(e) => updateProfile('parentPhoneNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter parent's phone number"
                  maxLength={10}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">🎯 Goals & Interests</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Career Interests</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {careerOptions.map(career => (
                    <label key={career} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.careerInterest?.includes(career) || false}
                        onChange={() => toggleArrayField('careerInterest', career)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{career}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Study Goals</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {['Improve Grades', 'Pass Exams', 'Learn New Skills', 'Prepare for Competition', 'Get Admission', 'Build Career'].map(goal => (
                    <label key={goal} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.studyGoals?.includes(goal) || false}
                        onChange={() => toggleArrayField('studyGoals', goal)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Areas</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {['Mathematics', 'Science', 'English', 'Hindi', 'Memory', 'Concentration', 'Time Management', 'Exam Fear'].map(challenge => (
                    <label key={challenge} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.challengeAreas?.includes(challenge) || false}
                        onChange={() => toggleArrayField('challengeAreas', challenge)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{challenge}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">📱 Technology & Study Habits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Device You Use</label>
                <select
                  value={profile.deviceType || ''}
                  onChange={(e) => updateProfile('deviceType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Device</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                  <option value="computer">Computer/Laptop</option>
                  <option value="multiple">Multiple Devices</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Internet Connectivity</label>
                <select
                  value={profile.internetConnectivity || ''}
                  onChange={(e) => updateProfile('internetConnectivity', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Connectivity</option>
                  <option value="good">Good (Fast & Stable)</option>
                  <option value="average">Average (Sometimes Slow)</option>
                  <option value="poor">Poor (Limited/Slow)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daily Study Time</label>
                <select
                  value={profile.studyTime || ''}
                  onChange={(e) => updateProfile('studyTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Study Time</option>
                  <option value="1-2 hours">1-2 hours</option>
                  <option value="2-4 hours">2-4 hours</option>
                  <option value="4-6 hours">4-6 hours</option>
                  <option value="6+ hours">6+ hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
                <input
                  type="tel"
                  value={profile.phoneNumber || ''}
                  onChange={(e) => updateProfile('phoneNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  maxLength={10}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (profileExists && currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Complete!</h2>
              <p className="text-gray-600 mb-6">
                Welcome back, {profile.fullName}! Your profile is all set up.
                Your learning experience is personalized for Class {profile.currentClass}.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Your Profile Summary:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Class:</strong> {profile.currentClass}</div>
                  <div><strong>School:</strong> {profile.school}</div>
                  <div><strong>Location:</strong> {profile.village}, {profile.district}, {profile.state}</div>
                  <div><strong>Language:</strong> {profile.preferredLanguage}</div>
                  <div><strong>Subjects:</strong> {profile.subjects?.length} selected</div>
                  <div><strong>Career Interest:</strong> {profile.careerInterest?.join(', ')}</div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setProfileExists(false);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">📝 Student Profile Setup</h2>
            <p className="text-gray-600">Help us personalize your learning experience</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
            >
              ← Previous
            </button>
            
            {currentStep === totalSteps ? (
              <button
                onClick={saveProfile}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    Save Profile ✅
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;