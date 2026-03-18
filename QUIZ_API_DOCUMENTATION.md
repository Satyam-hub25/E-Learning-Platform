git# Gamified Quiz API Documentation

## Overview
This API system provides a complete gamified learning experience with question fetching, answer validation, user progress tracking, badges, and leaderboards. All data is stored in Firebase Firestore for real-time synchronization.

## API Endpoints

### 1. Questions API (`/api/questions`)

#### GET - Fetch Random Questions
Retrieves random questions filtered by subject.

**URL:** `GET /api/questions?subject={subject}&limit={number}`

**Parameters:**
- `subject` (optional): Filter questions by subject (e.g., "Mathematics", "Science", "History")
- `limit` (optional): Number of questions to return (default: 1, max: 10)

**Example Request:**
```javascript
fetch('/api/questions?subject=Mathematics&limit=5')
```

**Response:**
```json
{
  "success": true,
  "message": "Questions retrieved successfully",
  "data": [
    {
      "id": "question123",
      "subject": "Mathematics",
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "points": 10,
      "difficulty": "easy"
    }
  ]
}
```

#### POST - Create New Question
Adds a new question to the database.

**URL:** `POST /api/questions`

**Body:**
```json
{
  "subject": "Mathematics",
  "question": "What is the square root of 16?",
  "options": ["2", "3", "4", "5"],
  "correctAnswer": 2,
  "points": 15,
  "difficulty": "medium"
}
```

### 2. Answer Checking API (`/api/check-answer`)

#### POST - Submit Answer
Validates answer, awards points, updates user progress, and checks for new badges/level ups.

**URL:** `POST /api/check-answer`

**Body:**
```json
{
  "questionId": "question123",
  "selectedAnswer": 1,
  "uid": "user456"
}
```

**Response (Correct Answer):**
```json
{
  "success": true,
  "message": "Correct! You earned 10 points.",
  "data": {
    "correct": true,
    "points": 10,
    "totalPoints": 150,
    "correctAnswer": 1,
    "explanation": "The correct answer is: 4",
    "newLevel": 2,
    "newBadges": ["hundred_club"]
  }
}
```

**Response (Incorrect Answer):**
```json
{
  "success": true,
  "message": "Incorrect. The correct answer was: 4",
  "data": {
    "correct": false,
    "points": 0,
    "totalPoints": 140,
    "correctAnswer": 1,
    "explanation": "The correct answer is: 4"
  }
}
```

#### GET - Get Question Details
Retrieves question details without checking an answer (for review purposes).

**URL:** `GET /api/check-answer?questionId={questionId}`

### 3. User Progress API (`/api/user-progress`)

#### GET - Get User Progress
Retrieves comprehensive user statistics, badges, and optional leaderboard.

**URL:** `GET /api/user-progress?uid={uid}&leaderboard={true/false}`

**Parameters:**
- `uid` (required): User ID
- `leaderboard` (optional): Include top 10 leaderboard (default: false)

**Response:**
```json
{
  "success": true,
  "message": "User progress retrieved successfully",
  "data": {
    "user": {
      "uid": "user456",
      "points": 150,
      "badges": ["first_points", "hundred_club"],
      "level": 2,
      "totalQuestionsAnswered": 15,
      "correctAnswers": 12,
      "subjects": {
        "mathematics": {
          "points": 80,
          "questionsAnswered": 8,
          "correctAnswers": 7
        }
      }
    },
    "stats": {
      "accuracyRate": 80,
      "nextLevelPoints": 300,
      "progressToNextLevel": 25
    },
    "badgeDetails": [
      {
        "id": "hundred_club",
        "name": "Century Club",
        "description": "Reached 100 points",
        "icon": "💯",
        "category": "milestone"
      }
    ],
    "leaderboard": [
      {
        "rank": 1,
        "uid": "user456",
        "points": 150,
        "level": 2,
        "isCurrentUser": true
      }
    ]
  }
}
```

#### POST - Initialize User Profile
Creates a new user profile with default settings.

**URL:** `POST /api/user-progress`

**Body:**
```json
{
  "uid": "user456",
  "displayName": "John Doe",
  "email": "john@example.com"
}
```

#### PATCH - Update User Profile
Updates allowed user profile fields.

**URL:** `PATCH /api/user-progress`

**Body:**
```json
{
  "uid": "user456",
  "updates": {
    "displayName": "John Smith",
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  }
}
```

## Gamification Features

### Point System
- **Easy Questions:** 10 points
- **Medium Questions:** 15 points
- **Hard Questions:** 20 points
- **Incorrect Answers:** 0 points

### Level System
- **Level 1:** 0-99 points
- **Level 2:** 100-299 points
- **Level 3:** 300-599 points
- **Level 4+:** Every 200 points thereafter

### Badge System

#### Point-Based Badges
- 🌱 **Getting Started** - First 10 points
- 💯 **Century Club** - 100 points
- 🏆 **High Achiever** - 500 points
- 👑 **Quiz Master** - 1000 points

#### Question-Based Badges
- 👶 **First Step** - First question answered
- 📚 **Learning Enthusiast** - 10 questions answered
- 🔍 **Knowledge Seeker** - 50 questions answered
- 🏅 **Quiz Champion** - 100 questions answered

## Database Schema

### Firestore Collections

#### `questions` Collection
```typescript
{
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}
```

#### `users` Collection
```typescript
{
  uid: string;
  points: number;
  badges: string[];
  level: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  subjects: {
    [subject: string]: {
      points: number;
      questionsAnswered: number;
      correctAnswers: number;
    };
  };
  lastActive: Date;
  createdAt: Date;
  displayName?: string;
  email?: string;
}
```

## Usage Examples

### Complete Quiz Flow
```javascript
// 1. Fetch a question
const questionResponse = await fetch('/api/questions?subject=Mathematics');
const question = await questionResponse.json();

// 2. User selects answer (e.g., option index 1)
const answerResponse = await fetch('/api/check-answer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    questionId: question.data[0].id,
    selectedAnswer: 1,
    uid: 'current-user-id'
  })
});
const result = await answerResponse.json();

// 3. Get updated user progress
const progressResponse = await fetch('/api/user-progress?uid=current-user-id&leaderboard=true');
const progress = await progressResponse.json();

// 4. Display results, new badges, level ups, etc.
if (result.data.newBadges) {
  console.log('New badges earned:', result.data.newBadges);
}
if (result.data.newLevel) {
  console.log('Level up! New level:', result.data.newLevel);
}
```

### Add New Questions
```javascript
const newQuestion = {
  subject: "Science",
  question: "What is the chemical symbol for water?",
  options: ["H2O", "CO2", "NaCl", "O2"],
  correctAnswer: 0,
  points: 10,
  difficulty: "easy"
};

await fetch('/api/questions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newQuestion)
});
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Development Setup

1. **Firebase Configuration:** Ensure `FIREBASE_PROJECT_ID` is set in environment variables
2. **Firestore Rules:** Configure appropriate security rules for production
3. **Emulator:** Use Firestore emulator for development testing
4. **Indexes:** Create composite indexes for complex queries if needed

## Security Considerations

- Validate all user inputs on the server side
- Implement rate limiting for API endpoints
- Use Firebase Auth to verify user identity
- Set appropriate Firestore security rules
- Never expose Firebase admin keys on the client side

This API system provides a robust foundation for gamified learning applications with real-time progress tracking and engaging user experiences.