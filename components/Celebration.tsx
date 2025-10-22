
import React from 'react';

const Star: React.FC<{ delay: string }> = ({ delay }) => (
    <div 
        className="absolute text-yellow-300 text-2xl animate-ping"
        style={{ animationDelay: delay }}
    >
        ✨
    </div>
);

const Celebration: React.FC = () => {
    return (
        <div className="relative flex flex-col items-center">
            <div className="text-7xl animate-bounce">🏆</div>
             <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[20%] left-[20%] animate-bounce" style={{animationDelay: '0s'}}>✨</div>
                <div className="absolute top-[10%] right-[25%] animate-bounce" style={{animationDelay: '0.2s'}}>⭐</div>
                <div className="absolute bottom-[15%] left-[30%] animate-bounce" style={{animationDelay: '0.4s'}}>✨</div>
                <div className="absolute bottom-[25%] right-[15%] animate-bounce" style={{animationDelay: '0.6s'}}>⭐</div>
            </div>
            <h3 className="text-3xl text-yellow-400 mt-4">SUBIU DE NÍVEL!</h3>
        </div>
    );
};

export default Celebration;
