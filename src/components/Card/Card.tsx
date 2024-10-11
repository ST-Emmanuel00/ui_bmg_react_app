import React, { useState } from 'react';

interface CardProps {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
    const [isRed, setIsRed] = useState<boolean>(false); 

    return (
        <div className={`relative rounded-lg shadow-md border border-black ${isRed ? 'bg-red-100 text-gray-800' : 'bg-white dark:bg-gray-800 dark:text-white'} transition-colors duration-300`} style={{ width: '350px', height: '160px' }}>
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                
                {/*  */}
                <button onClick={() => setIsRed(!isRed)} className="w-5 h-5 cursor-pointer">
                    {/* Placeholder for the menu icon */}
                </button>
            </div>

            <div className="px-4 py-4 flex flex-col h-full">
                {children}
            </div>
        </div>
    );
};
