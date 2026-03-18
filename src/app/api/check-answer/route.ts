import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questionId, selectedAnswer, uid } = body;

    const mockCorrectAnswers: { [key: string]: number } = {
      'math-1': 0,
      'math-2': 1,
      'science-1': 2,
      'science-2': 0,
      'history-1': 1,
      'history-2': 2,
      'geography-1': 0,
      'geography-2': 1,
      'english-1': 2,
      'english-2': 0,
      'physics-1': 1,
      'physics-2': 2,
      'cs-1': 0,
      'cs-2': 1
    };

    const correctAnswer = mockCorrectAnswers[questionId] || 0;
    const isCorrect = selectedAnswer === correctAnswer;
    const points = isCorrect ? 10 : 0;

    const responseData = {
      correct: isCorrect,
      points: points,
      totalPoints: 100 + points,
      correctAnswer: correctAnswer,
      explanation: isCorrect ? "Correct! Well done!" : "That's not quite right, but keep trying!",
      newLevel: 2,
      newBadges: isCorrect ? ["Great Job!"] : []
    };

    return NextResponse.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('Error checking answer:', error);
    return NextResponse.json(
      { success: false, message: 'Error checking answer' },
      { status: 500 }
    );
  }
}
