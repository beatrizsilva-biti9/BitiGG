import React, { useState, useCallback, useMemo } from 'react';
import { QUIZ_QUESTIONS } from './constants';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';
import ProgressBar from './components/ProgressBar';
import { playCorrectSound, playIncorrectSound } from './utils/sound';

// Algoritmo Fisher-Yates para embaralhar de forma imparcial
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const App: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = useMemo(() => {
        const questionData = QUIZ_QUESTIONS[currentQuestionIndex];
        return {
            ...questionData,
            options: shuffleArray(questionData.options),
        };
    }, [currentQuestionIndex]);

    const handleAnswer = useCallback((answer: string) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        setIsAnswered(true);

        if (answer === currentQuestion.correctAnswer) {
            playCorrectSound();
            setScore(prev => prev + 1);
        } else {
            playIncorrectSound();
        }

        setTimeout(() => {
            const nextQuestion = currentQuestionIndex + 1;
            if (nextQuestion < QUIZ_QUESTIONS.length) {
                setCurrentQuestionIndex(nextQuestion);
                setSelectedAnswer(null);
                setIsAnswered(false);
            } else {
                setQuizFinished(true);
            }
        }, 1500); // Wait 1.5 seconds to show feedback
    }, [currentQuestionIndex, isAnswered, currentQuestion]);

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizFinished(false);
        setSelectedAnswer(null);
        setIsAnswered(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-5xl text-cyan-400 text-center mb-2 tracking-wider">Onboarding Biti9</h1>
                <p className="text-center text-blue-300 mb-8">-- NÍVEL 1 --</p>

                <div className="bg-blue-900/50 border-4 border-blue-600 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(37,99,235,0.5)]">
                    {quizFinished ? (
                        <ResultsScreen 
                            score={score} 
                            totalQuestions={QUIZ_QUESTIONS.length} 
                            onRestart={handleRestart} 
                        />
                    ) : (
                        <>
                            <ProgressBar 
                                current={currentQuestionIndex + 1} 
                                total={QUIZ_QUESTIONS.length} 
                            />
                            <QuestionCard
                                question={currentQuestion}
                                onAnswer={handleAnswer}
                                isAnswered={isAnswered}
                                selectedAnswer={selectedAnswer}
                            />
                        </>
                    )}
                </div>
                 <p className="text-center text-xs text-blue-700 mt-8">Desafie-se e mostre que já está no super conectado a BITi9!</p>
            </div>
        </div>
    );
};

export default App;
