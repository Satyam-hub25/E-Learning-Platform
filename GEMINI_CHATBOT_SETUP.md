# 🤖 EduQuest AI Chatbot - Gemini Integration

## 🚀 Quick Setup Guide

### 1. Get Your Free Gemini API Key

1. **Visit Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create API Key** - Click "Create API Key" button
4. **Copy** the generated API key

### 2. Configure Your API Key

1. Open your `.env.local` file in the project root
2. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here
   ```
3. Save the file and restart your development server

### 3. Test the Chatbot

1. Open your dashboard at `http://localhost:3000/dashboard`
2. Look for the 🤖 chatbot icon in the bottom-right corner
3. Click it to open the AI assistant
4. Try asking questions like:
   - "Explain the Pythagorean theorem"
   - "What is photosynthesis?"
   - "Give me study tips for exams"

## ✨ Features

### 🎯 **Educational Focus**
- Specialized for learning and educational content
- Provides step-by-step explanations
- Offers study tips and learning strategies

### 💬 **Smart Conversations**
- Maintains conversation context
- Remembers previous messages in the chat
- Provides personalized responses

### 🛡️ **Safety First**
- Built-in content filtering
- Educational content guidelines
- Safe and appropriate responses

### 🎨 **Beautiful UI**
- Modern chat interface with animations
- Typing indicators and message timestamps
- Suggested questions for easy interaction
- Mobile-responsive design

## 🔧 Technical Details

### API Endpoint
- **URL**: `/api/chatbot`
- **Method**: POST
- **Body**: `{ message: string, conversationHistory: array }`

### Response Format
```json
{
  "success": true,
  "response": "AI generated response text"
}
```

### Fallback Mode
If no API key is configured, the chatbot will:
- Still provide basic educational support
- Show setup instructions
- Work in demonstration mode

## 🆘 Troubleshooting

### Common Issues

1. **"API key not found" error**
   - Check if `.env.local` file exists
   - Verify the API key is correctly formatted
   - Restart the development server

2. **"Rate limit exceeded"**
   - Gemini has free usage limits
   - Wait a few minutes before trying again
   - Consider upgrading to paid plan for higher limits

3. **Connection errors**
   - Check your internet connection
   - Verify the API key is valid
   - Try refreshing the page

### Free Tier Limits
- **Requests per minute**: 60
- **Requests per day**: 1,500
- **Tokens per request**: 32,768

## 🌟 Example Conversations

### Study Help
**User**: "I don't understand calculus derivatives"
**AI**: "I'd be happy to help you understand derivatives! Let me break it down step by step..."

### Problem Solving
**User**: "Solve: 2x + 5 = 13"
**AI**: "Let's solve this equation together:
1. Start with: 2x + 5 = 13
2. Subtract 5 from both sides: 2x = 8
3. Divide by 2: x = 4..."

### Study Tips
**User**: "How can I study better for my science exam?"
**AI**: "Here are some effective study strategies for science:
📚 Active recall - Test yourself frequently
🎯 Spaced repetition - Review material over time..."

## 🎓 Educational Subjects Supported

- 🔢 **Mathematics** - Algebra, Geometry, Calculus, Statistics
- 🔬 **Science** - Physics, Chemistry, Biology, Earth Science
- 📚 **Language Arts** - Grammar, Literature, Writing
- 🏛️ **History** - World History, Ancient Civilizations
- 🌍 **Geography** - Countries, Capitals, Physical Geography
- 💻 **Computer Science** - Programming, Algorithms, Data Structures
- 🎨 **General Study Skills** - Note-taking, Exam strategies

---

**Need Help?** The AI assistant is always ready to help with your learning journey! 🚀📚