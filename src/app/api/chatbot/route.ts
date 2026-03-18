import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { 
          success: true, 
          response: "🤖 Hi! I'm the EduQuest AI Assistant. I'm here to help you with your learning journey!\n\n**To enable full AI capabilities:**\n1. Get a free API key from Google AI Studio: https://makersuite.google.com/app/apikey\n2. Add it to your .env.local file as GEMINI_API_KEY\n\nFor now, I can provide basic educational support. What would you like to learn about?" 
        },
        { status: 200 }
      );
    }

    // Build context for educational assistant
    const systemPrompt = `You are EduQuest AI, an intelligent educational assistant for an e-learning platform. Your role is to:

1. **Learning Support**: Help students understand concepts, solve problems, and learn new topics
2. **Study Guidance**: Provide study tips, create learning plans, and suggest resources
3. **Quiz Assistance**: Explain quiz answers, clarify concepts, and provide additional practice
4. **Educational Content**: Generate educational examples, analogies, and explanations
5. **Motivation**: Encourage learners and celebrate their progress

**Guidelines:**
- Keep responses educational, helpful, and encouraging
- Use simple language appropriate for the learner's level
- Provide examples when explaining concepts
- Be patient and supportive
- If unsure, ask clarifying questions
- Include emojis to make interactions friendly 📚✨

**Context**: This is an educational platform with gamified quizzes covering subjects like Mathematics, Science, History, Geography, English, Physics, and Computer Science.`;

    // Build conversation context
    let conversationContext = systemPrompt + "\n\nConversation History:\n";
    
    // Add recent conversation history (last 10 messages to stay within limits)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach((msg: any) => {
      conversationContext += `${msg.role === 'user' ? 'Student' : 'AI'}: ${msg.content}\n`;
    });
    
    conversationContext += `\nCurrent Student Question: ${message}\n\nPlease provide a helpful, educational response:`;

    // Call Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: conversationContext
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error('Gemini API Error:', errorData);
      
      return NextResponse.json(
        { 
          success: true, 
          response: "🔧 I'm having trouble connecting to my AI brain right now. But I'm still here to help! Try asking me about:\n\n📚 Study tips\n🧮 Math problems\n🔬 Science concepts\n📖 Subject explanations\n\nWhat would you like to learn about?" 
        },
        { status: 200 }
      );
    }

    const data = await geminiResponse.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return NextResponse.json({
        success: true,
        response: aiResponse
      });
    } else {
      throw new Error('Invalid response format from Gemini API');
    }

  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    
    return NextResponse.json(
      { 
        success: true, 
        response: "🤖 Oops! I'm experiencing some technical difficulties. But don't worry, I'm still here to help!\n\n**I can assist you with:**\n• Math and Science problems\n• Study strategies\n• Quiz explanations\n• Subject concepts\n\nWhat would you like to explore today? 🚀" 
      },
      { status: 200 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "EduQuest AI Chatbot is ready! 🤖📚",
    status: "operational"
  });
}