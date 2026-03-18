"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { user, signInWithGoogle, signInWithGoogleRedirect, loading } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showRedirectOption, setShowRedirectOption] = useState(false);
  const [autoFallbackUsed, setAutoFallbackUsed] = useState(false);

  const educationalQuotes = [
    "Education is the most powerful weapon to change the world.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Every expert was once a beginner.",
    "Knowledge is power, but enthusiasm pulls the switch."
  ];

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % educationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setErrorMessage(null);
      setShowRedirectOption(false);
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Check if this is a popup-related error
      const isPopupError = error.message.includes('popup') || 
                          error.message.includes('cancelled') || 
                          error.message.includes('blocked') ||
                          error.message.includes('took too long');
      
      if (isPopupError && !autoFallbackUsed) {
        // Auto-fallback to redirect method
        setAutoFallbackUsed(true);
        setErrorMessage('Popup sign-in failed. Trying redirect method...');
        
        try {
          setTimeout(async () => {
            await handleGoogleSignInRedirect();
          }, 2000); // Wait 2 seconds before redirect
          return;
        } catch (redirectError) {
          setErrorMessage('Both popup and redirect sign-in failed. Please check your internet connection and try again.');
        }
      } else {
        setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
        if (isPopupError) {
          setShowRedirectOption(true);
        }
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignInRedirect = async () => {
    try {
      setErrorMessage(null);
      setIsSigningIn(true);
      await signInWithGoogleRedirect();
      // The redirect will happen automatically, no need to handle the result here
    } catch (error: any) {
      console.error('Redirect sign in error:', error);
      setErrorMessage(error.message || 'Redirect sign-in failed. Please check your internet connection and try again.');
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mx-auto"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-white/10"></div>
          </div>
          <p className="text-white mt-4 font-medium">Loading your learning portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Educational Icons */}
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">📚</span>
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-3xl">🎓</span>
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">💡</span>
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-xl">🔬</span>
          </div>
        </div>
        <div className="absolute top-1/2 left-5 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl">🌟</span>
          </div>
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">n
        <div className="w-full max-w-md">
          {/* Main Login Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-500">
            
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="relative mx-auto mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mx-auto flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-spin rounded-full"></div>
                  <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-xs">✨</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                EduLearn
              </h1>
              <p className="text-gray-600 font-medium">Unlock Your Learning Potential</p>
            </div>

            {/* Animated Quote Section */}
            <div className="text-center mb-8 h-16 flex items-center justify-center">
              <div className="transition-all duration-1000 ease-in-out">
                <p className="text-sm text-gray-600 italic px-4 leading-relaxed">
                  "{educationalQuotes[currentQuote]}"
                </p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Learner! 🚀</h2>
              <p className="text-gray-600">Ready to continue your amazing journey?</p>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {isSigningIn ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-3 border-white/30 border-t-white"></div>
                  <span>Signing you in...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                  <span className="text-xl">🚀</span>
                </>
              )}
            </button>

            {/* Popup Blocker Tip */}
            {(showRedirectOption || autoFallbackUsed) && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 text-sm">💡</span>
                  <div className="text-xs text-yellow-800">
                    <p className="font-medium">Popup sign-in not working?</p>
                    <p className="mt-1">Your browser might be blocking popups. Try allowing popups for this site or use the redirect option below.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Alternative Sign-in Note */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Having trouble with popups? 
                <button
                  onClick={handleGoogleSignInRedirect}
                  disabled={isSigningIn}
                  className="ml-1 text-blue-600 hover:text-blue-800 underline disabled:text-blue-400"
                >
                  Try redirect sign-in
                </button>
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className={`mt-4 p-4 border rounded-xl ${
                errorMessage.includes('Trying redirect') 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={errorMessage.includes('Trying redirect') ? 'text-blue-500' : 'text-red-500'}>
                    {errorMessage.includes('Trying redirect') ? '🔄' : '⚠️'}
                  </span>
                  <p className={`text-sm font-medium ${
                    errorMessage.includes('Trying redirect') 
                      ? 'text-blue-700' 
                      : 'text-red-700'
                  }`}>
                    {errorMessage}
                  </p>
                </div>
                
                {!errorMessage.includes('Trying redirect') && (
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => {
                        setErrorMessage(null);
                        setShowRedirectOption(false);
                        setAutoFallbackUsed(false);
                      }}
                      className="text-red-600 hover:text-red-800 text-xs underline"
                    >
                      Dismiss
                    </button>
                    {(showRedirectOption || (errorMessage.includes('popup') || errorMessage.includes('cancelled'))) && (
                      <button
                        onClick={handleGoogleSignInRedirect}
                        disabled={isSigningIn}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs rounded-md transition-colors flex items-center gap-1"
                      >
                        {isSigningIn ? (
                          <>
                            <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                            Redirecting...
                          </>
                        ) : (
                          'Try with Redirect'
                        )}
                      </button>
                    )}
                  </div>
                )}
                
                {errorMessage.includes('Trying redirect') && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-blue-600 text-xs">Please wait, redirecting to Google...</span>
                  </div>
                )}
              </div>
            )}

            {/* Features Preview */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="group cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl mx-auto mb-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-2xl">📖</span>
                </div>
                <p className="text-xs text-gray-600 font-medium">Interactive Courses</p>
              </div>
              
              <div className="group cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl mx-auto mb-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-xs text-gray-600 font-medium">Achievements</p>
              </div>
              
              <div className="group cursor-pointer">
                <div className="w-12 h-12 bg-pink-100 group-hover:bg-pink-200 rounded-xl mx-auto mb-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-xs text-gray-600 font-medium">Community</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="text-green-500">🔒</span>
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-blue-500">⚡</span>
                  <span>Fast</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-purple-500">🌟</span>
                  <span>Trusted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-white/80">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-3">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-xs">Active Learners</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-3">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs">Courses</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-3">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
