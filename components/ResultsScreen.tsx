import React, { useEffect } from 'react';
import Celebration from './Celebration';
import { playWinSound, playLoseSound, playClickSound } from '../utils/sound';

interface ResultsScreenProps {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onRestart }) => {
    const passed = score > totalQuestions / 2;

    useEffect(() => {
        // Small delay to allow the component to render before playing the sound
        const timer = setTimeout(() => {
            if (passed) {
                playWinSound();
            } else {
                playLoseSound();
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [passed]);

    return (
        <div className="text-center flex flex-col items-center justify-center h-full py-8">
            {passed ? (
                <>
                    <Celebration />
                    <h2 className="text-2xl text-green-400 mt-4">Parabéns!</h2>
                    <p className="text-blue-200 mt-2">Você passou no quiz de onboarding!</p>
                </>
            ) : (
                <>
                    <div className="text-7xl mb-4">👾</div>
                    <h2 className="text-2xl text-red-400">Fim de Jogo</h2>
                    <p className="text-blue-200 mt-2">Você precisa de mais prática. Tente novamente!</p>
                </>
            )}
            <p className="text-xl text-cyan-300 my-6">
                Sua Pontuação: <span className="text-yellow-400">{score}</span> / {totalQuestions}
            </p>
            <button
                onClick={() => {
                    playClickSound();
                    onRestart();
                }}
                className="p-4 bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-400 transition-all duration-300 transform hover:scale-105"
            >
                <span className="text-yellow-400 mr-2">&gt;</span>Jogar Novamente
            </button>
        </div>
    );
};

export default ResultsScreen;