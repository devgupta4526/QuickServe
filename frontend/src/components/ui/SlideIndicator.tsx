import React from 'react';
import clsx from 'clsx';

interface SlideIndicatorProps {
    total: number;
    current: number;
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({ total, current }) => {
    return (
        <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: total }).map((_, index : number) => (
                <span
                    key={index}
                    className={clsx(
                        'h-2 w-6 rounded-full transition-all',
                        index === current
                            ? 'bg-orange-500 w-8'
                            : 'bg-gray-300 w-6'
                    )}
                />
            ))}
        </div>
    );
};

export default SlideIndicator;
