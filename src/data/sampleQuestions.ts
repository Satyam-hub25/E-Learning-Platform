// Sample Quiz Questions for Gamified Learning
// Run this script to populate your Firestore database with sample questions

const sampleQuestions = [
  // Mathematics Questions - Easy
  {
    subject: "Mathematics",
    question: "What is the value of π (pi) approximately?",
    options: ["3.14", "2.71", "1.41", "4.67"],
    correctAnswer: 0,
    points: 10,
    difficulty: "easy"
  },
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
    question: "What is 5 × 7?",
    options: ["30", "35", "40", "45"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },

  // Mathematics Questions - Medium
  {
    subject: "Mathematics",
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Mathematics",
    question: "Solve for x: 2x + 5 = 15",
    options: ["5", "10", "3", "7"],
    correctAnswer: 0,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Mathematics",
    question: "What is the area of a circle with radius 3?",
    options: ["6π", "9π", "12π", "18π"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },

  // Mathematics Questions - Hard
  {
    subject: "Mathematics",
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2x²"],
    correctAnswer: 1,
    points: 20,
    difficulty: "hard"
  },
  {
    subject: "Mathematics",
    question: "Solve: ∫x dx",
    options: ["x²/2 + C", "x + C", "2x + C", "x²/3 + C"],
    correctAnswer: 0,
    points: 20,
    difficulty: "hard"
  },

  // Science Questions - Easy
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
    question: "How many legs does a spider have?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "Science",
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },

  // Science Questions - Medium
  {
    subject: "Science",
    question: "How many bones are in the human body?",
    options: ["206", "208", "210", "204"],
    correctAnswer: 0,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Science",
    question: "Which gas makes up about 78% of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
    correctAnswer: 2,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Science",
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: 2,
    points: 15,
    difficulty: "medium"
  },

  // Science Questions - Hard
  {
    subject: "Science",
    question: "What is the speed of light in vacuum?",
    options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "298,792,458 m/s"],
    correctAnswer: 0,
    points: 20,
    difficulty: "hard"
  },
  {
    subject: "Science",
    question: "What is the molecular formula for glucose?",
    options: ["C6H12O6", "C12H22O11", "C2H6O", "CH4"],
    correctAnswer: 0,
    points: 20,
    difficulty: "hard"
  },

  // History Questions - Easy
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
    question: "Which empire was ruled by Julius Caesar?",
    options: ["Greek Empire", "Roman Empire", "Persian Empire", "Egyptian Empire"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "History",
    question: "In which year did the Titanic sink?",
    options: ["1910", "1911", "1912", "1913"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },

  // History Questions - Medium
  {
    subject: "History",
    question: "The Renaissance began in which country?",
    options: ["France", "Germany", "Italy", "Spain"],
    correctAnswer: 2,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "History",
    question: "When did the Berlin Wall fall?",
    options: ["1987", "1988", "1989", "1990"],
    correctAnswer: 2,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "History",
    question: "Who wrote the Declaration of Independence?",
    options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
    correctAnswer: 2,
    points: 15,
    difficulty: "medium"
  },

  // History Questions - Hard
  {
    subject: "History",
    question: "The Treaty of Versailles ended which war?",
    options: ["World War I", "World War II", "Napoleonic Wars", "Franco-Prussian War"],
    correctAnswer: 0,
    points: 20,
    difficulty: "hard"
  },
  {
    subject: "History",
    question: "Who was the last Tsar of Russia?",
    options: ["Nicholas I", "Alexander III", "Nicholas II", "Alexander II"],
    correctAnswer: 2,
    points: 20,
    difficulty: "hard"
  },

  // Geography Questions - Easy  
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
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "Geography",
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },

  // Geography Questions - Medium
  {
    subject: "Geography",
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: 2,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Geography",
    question: "Which is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Geography",
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },

  // Geography Questions - Hard
  {
    subject: "Geography",
    question: "Which country has the most time zones?",
    options: ["Russia", "United States", "China", "Canada"],
    correctAnswer: 0,
    points: 20,
    difficulty: "hard"
  },
  {
    subject: "Geography",
    question: "What is the deepest point in Earth's oceans?",
    options: ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Philippine Trench"],
    correctAnswer: 0,
    points: 20,
    difficulty: "hard"
  },

  // English Questions - Easy
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
  {
    subject: "English",
    question: "How many letters are in the English alphabet?",
    options: ["24", "25", "26", "27"],
    correctAnswer: 2,
    points: 10,
    difficulty: "easy"
  },

  // English Questions - Medium
  {
    subject: "English",
    question: "Which of these is a metaphor?",
    options: ["He runs like the wind", "Time is money", "She sings beautifully", "The cat is sleeping"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "English",
    question: "What is the superlative form of 'good'?",
    options: ["gooder", "goodest", "better", "best"],
    correctAnswer: 3,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "English",
    question: "What type of word is 'quickly'?",
    options: ["Noun", "Verb", "Adjective", "Adverb"],
    correctAnswer: 3,
    points: 15,
    difficulty: "medium"
  },

  // English Questions - Hard
  {
    subject: "English",
    question: "Who wrote '1984'?",
    options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Margaret Atwood"],
    correctAnswer: 1,
    points: 20,
    difficulty: "hard"
  },
  {
    subject: "English",
    question: "What is an example of alliteration?",
    options: ["Busy as a bee", "Peter Piper picked", "Time flies", "Break a leg"],
    correctAnswer: 1,
    points: 20,
    difficulty: "hard"
  },

  // Physics Questions - Easy
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
    question: "What force keeps planets in orbit around the sun?",
    options: ["Magnetism", "Gravity", "Friction", "Tension"],
    correctAnswer: 1,
    points: 10,
    difficulty: "easy"
  },
  {
    subject: "Physics",
    question: "What is the unit of frequency?",
    options: ["Hertz", "Joule", "Newton", "Pascal"],
    correctAnswer: 0,
    points: 10,
    difficulty: "easy"
  },

  // Physics Questions - Medium
  {
    subject: "Physics",
    question: "What is the formula for force?",
    options: ["F = ma", "F = mv", "F = mg", "F = m/a"],
    correctAnswer: 0,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Physics",
    question: "What is the acceleration due to gravity on Earth?",
    options: ["9.8 m/s²", "10 m/s²", "9.6 m/s²", "9.9 m/s²"],
    correctAnswer: 0,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Physics",
    question: "What is the first law of thermodynamics about?",
    options: ["Heat transfer", "Energy conservation", "Entropy", "Temperature"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },

  // Physics Questions - Hard
  {
    subject: "Physics",
    question: "What is Einstein's famous equation?",
    options: ["E = mc", "E = mc²", "E = m²c", "E = mc³"],
    correctAnswer: 1,
    points: 20,
    difficulty: "hard"
  },
  {
    subject: "Physics",
    question: "What is Planck's constant approximately?",
    options: ["6.63 × 10⁻³⁴ J·s", "3.00 × 10⁸ m/s", "1.60 × 10⁻¹⁹ C", "9.11 × 10⁻³¹ kg"],
    correctAnswer: 0,
    points: 20,
    difficulty: "hard"
  },

  // Computer Science Questions - Easy
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

  // Computer Science Questions - Medium
  {
    subject: "Computer Science",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },
  {
    subject: "Computer Science",
    question: "Which data structure uses LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    points: 15,
    difficulty: "medium"
  },

  // Computer Science Questions - Hard
  {
    subject: "Computer Science",
    question: "What is the worst-case time complexity of quicksort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: 1,
    points: 20,
    difficulty: "hard"
  }
];

// Function to add questions to Firestore
export async function addSampleQuestions() {
  try {
    let successCount = 0;
    let errorCount = 0;

    for (const question of sampleQuestions) {
      try {
        const response = await fetch('/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(question)
        });

        const result = await response.json();
        
        if (result.success) {
          successCount++;
          console.log(`✅ Added question: ${question.question.substring(0, 50)}...`);
        } else {
          errorCount++;
          console.error(`❌ Failed to add question: ${question.question.substring(0, 50)}...`, result.error);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Error adding question: ${question.question.substring(0, 50)}...`, error);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully added: ${successCount} questions`);
    console.log(`❌ Failed to add: ${errorCount} questions`);
    console.log(`📝 Total questions: ${sampleQuestions.length}`);

    return { successCount, errorCount, total: sampleQuestions.length };
  } catch (error) {
    console.error('Error in addSampleQuestions:', error);
    throw error;
  }
}

// Export the questions for use in other files
export { sampleQuestions };