
import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progressPercentage = (current / total) * 100;

    return (
        <div className="mb-6">
            <p className="text-sm text-blue-300 mb-2">Pergunta {current} de {total}</p>
            <div className="w-full bg-blue-950 border-2 border-blue-700 h-6 p-1">
                <div 
                    className={`bg-cyan-400 h-full transition-all duration-500 ease-out`}
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
