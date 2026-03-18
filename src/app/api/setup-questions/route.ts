import { NextRequest, NextResponse } from 'next/server';
import { db, handleFirestoreError } from '@/lib/firestore';
import { collection, addDoc } from 'firebase/firestore';

interface QuestionData {
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const sampleQuestions: QuestionData[] = [
  // Mathematics
  {
    subject: "mathematics",
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "mathematics",
    question: "What is the square root of 16?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "mathematics",
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },
  
  // Science
  {
    subject: "science",
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: 0,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "science",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "science",
    question: "What is the process by which plants make their food?",
    options: ["Respiration", "Digestion", "Photosynthesis", "Fermentation"],
    correctAnswer: 2,
    points: 15,
    difficulty: "medium"
  },
  
  // History
  {
    subject: "history",
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "history",
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },
  
  // Geography
  {
    subject: "geography",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Madrid", "Paris"],
    correctAnswer: 3,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "geography",
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },
  
  // English
  {
    subject: "english",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "english",
    question: "What is a synonym for 'happy'?",
    options: ["sad", "angry", "joyful", "tired"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },
  
  // Physics
  {
    subject: "physics",
    question: "What is the unit of electric current?",
    options: ["Volt", "Ohm", "Ampere", "Watt"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "physics",
    question: "At what temperature does water boil at sea level?",
    options: ["90°C", "95°C", "100°C", "105°C"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },
  
  // Computer Science
  {
    subject: "computer science",
    question: "What does 'HTML' stand for?",
    options: ["High Tech Modern Language", "HyperText Markup Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "computer science",
    question: "Which of the following is a programming language?",
    options: ["HTTP", "HTML", "Python", "CSS"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    if (action !== 'setup_sample_questions') {
      return NextResponse.json({
        success: false,
        message: 'Invalid action. Use "setup_sample_questions"'
      }, { status: 400 });
    }
    
    console.log('Setting up sample questions...');
    const questionsRef = collection(db, 'questions');
    let addedCount = 0;
    const errors: string[] = [];
    
    // Add questions with retry logic
    for (const questionData of sampleQuestions) {
      try {
        await retryOperation(async () => {
          const newQuestion = {
            ...questionData,
            createdAt: new Date()
          };
          await addDoc(questionsRef, newQuestion);
          addedCount++;
          console.log(`Added question: ${questionData.question.substring(0, 50)}...`);
        });
      } catch (error: any) {
        const errorMsg = `Failed to add question "${questionData.question}": ${error.message}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully added ${addedCount} questions to the database`,
      data: {
        added: addedCount,
        total: sampleQuestions.length,
        errors: errors.length > 0 ? errors : undefined
      }
    });
    
  } catch (error: any) {
    console.error('Error setting up sample questions:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to setup sample questions',
      error: error.message
    }, { status: 500 });
  }
}

// Retry utility function
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      if (attempt === maxRetries || !handleFirestoreError(error)) {
        throw error;
      }
      console.log(`Operation failed (attempt ${attempt}), retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error('Max retries exceeded');
}