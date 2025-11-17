import React from 'react';
import { playClickSound } from '../utils/sound';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-full py-8">
            <div className="text-7xl mb-4 animate-bounce">🤖</div>
            <h2 className="text-2xl text-cyan-300 mb-4">Bem-vindo!</h2>
            <p className="text-blue-200 mt-2 mb-8 max-w-md leading-relaxed">
                Prepare-se para testar seus conhecimentos sobre a cultura da Biti9. Pressione o botão para começar a aventura!
            </p>
            <button
                onClick={() => {
                    playClickSound();
                    onStart();
                }}
                className="p-4 bg-green-600 hover:bg-green-500 text-white border-2 border-green-400 transition-all duration-300 transform hover:scale-105"
            >
                <span className="text-yellow-400 mr-2">&gt;</span>Iniciar Jogo
            </button>
        </div>
    );
};

export default StartScreen;