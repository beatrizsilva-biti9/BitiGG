import React from 'react';
import type { Question } from '../types';
import { playClickSound } from '../utils/sound';

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: string) => void;
    isAnswered: boolean;
    selectedAnswer: string | null;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, isAnswered, selectedAnswer }) => {
    
    const getButtonClass = (option: string) => {
        if (!isAnswered) {
            return "bg-blue-800 hover:bg-blue-700 text-blue-100";
        }
        if (option === question.correctAnswer) {
            return "bg-green-600 animate-pulse text-white";
        }
        if (option === selectedAnswer && option !== question.correctAnswer) {
            return "bg-red-600 text-white";
        }
        return "bg-blue-900 text-blue-500 cursor-not-allowed";
    };

    return (
        <div>
            <h2 className="text-lg md:text-xl text-cyan-300 mb-6 leading-relaxed">
                {question.question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => {
                            if (!isAnswered) {
                                playClickSound();
                                onAnswer(option);
                            }
                        }}
                        disabled={isAnswered}
                        className={`p-4 border-2 border-blue-500 text-left text-sm transition-all duration-300 transform hover:scale-105 ${getButtonClass(option)}`}
                    >
                        <span className="text-yellow-400 mr-2">&gt;</span>{option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;