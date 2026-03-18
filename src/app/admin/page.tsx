"use client";

import React, { useState } from 'react';
import { addSampleQuestions } from '../../data/sampleQuestions';

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ successCount: number; errorCount: number; total: number } | null>(null);

  const handleAddQuestions = async () => {
    setLoading(true);
    setResult(null);

    try {
      const result = await addSampleQuestions();
      setResult(result);
    } catch (error) {
      console.error('Error adding questions:', error);
      alert('Error adding questions. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🔧 Quiz Admin Panel
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-6">
              Add sample quiz questions to your Firestore database to populate the gamified learning system.
            </p>
            
            <button
              onClick={handleAddQuestions}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
                  Adding Questions...
                </>
              ) : (
                <>
                  📚 Add Sample Questions
                </>
              )}
            </button>
          </div>

          {result && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="text-lg font-bold text-green-800 mb-4">✅ Questions Added Successfully!</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{result.successCount}</div>
                  <div className="text-sm text-gray-600">Added</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{result.errorCount}</div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <h3 className="text-lg font-bold text-blue-800 mb-4">📋 Sample Questions Include:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🔢</span>
                  <span>Mathematics (5 questions)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">🔬</span>
                  <span>Science (5 questions)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">🏛️</span>
                  <span>History (5 questions)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">🌍</span>
                  <span>Geography (5 questions)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-600">📚</span>
                  <span>English (5 questions)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">⚛️</span>
                  <span>Physics (5 questions)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 underline font-medium"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;