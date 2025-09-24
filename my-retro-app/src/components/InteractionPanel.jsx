import React from 'react';
import { IoSend } from 'react-icons/io5';
import { FaMicrophone } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";

const PixelArtPlaceholder = () => (
    <svg width="128" height="128" viewBox="0 0 64 64" className="mx-auto" style={{ imageRendering: 'pixelated' }}>
        <rect fill="#0F110C" width="64" height="64" />
        <rect fill="#F28500" x="16" y="16" width="32" height="32" />
        <rect fill="#60A5FA" x="24" y="24" width="8" height="8" />
        <rect fill="#60A5FA" x="40" y="24" width="8" height="8" />
        <rect fill="#FF5964" x="24" y="40" width="24" height="8" />
    </svg>
);

const InteractionPanel = ({ target, onClose }) => {
  const [processedImageUrl, setProcessedImageUrl] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (!target) return;

        setIsLoading(true);
        setProcessedImageUrl(null);
        
        const prompt = `8 bit pixel art of kim kardashian, white background`;
        // *** CHANGE HERE: Pointing to the local server now ***
        const imageUrl = `http://localhost:3001/api/pixel-art?prompt=${encodeURIComponent(prompt)}`;

        const img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            
            canvas.width = img.naturalWidth || 256;
            canvas.height = img.naturalHeight || 256;
            
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    if (r > 240 && g > 240 && b > 240) {
                        data[i + 3] = 0;
                    }
                }
                
                ctx.putImageData(imageData, 0, 0);
                setProcessedImageUrl(canvas.toDataURL('image/png'));
            } catch (error) {
                console.error("Canvas processing failed:", error);
                setProcessedImageUrl(img.src);
            } finally {
                setIsLoading(false);
            }
        };

        img.onerror = () => {
            console.error("Failed to load image from API.");
            setProcessedImageUrl('[https://placehold.co/256x256/0F110C/F28500?text=Error](https://placehold.co/256x256/0F110C/F28500?text=Error)');
            setIsLoading(false);
        };

        img.src = imageUrl;

    }, [target]);

    return (
        <div className="pixel-frame h-full w-full animate-fade-in">
            <div className="pixel-frame-content p-4 sm:p-6 flex flex-col h-full relative">
                
                <div className="flex-shrink-0 mb-4">
                    <button 
                        onClick={onClose} 
                        className="pixel-button font-pixel text-sm"
                    >
                        <FaArrowLeft />
                        <span>Back</span>
                    </button>
                </div>

                <div className="flex-grow flex flex-col justify-center items-center gap-4 text-center overflow-y-auto">
                    <div className="w-full max-w-2xl">
                        <div className="pixel-frame">
                            <div className="pixel-frame-content p-4">
                                <p className="text-white font-mono text-lg">
                                    Greetings. I am {target.title}. Ask me anything about my life and my principles.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 flex items-center justify-center" style={{ width: 256, height: 256 }}>
                        {isLoading && (
                           <div className="font-pixel text-sm text-gray-400">LOADING ART...</div>
                        )}
                        {processedImageUrl && !isLoading && (
                            <img 
                                src={processedImageUrl} 
                                alt={`Pixel art of ${target.title}`}
                                width="256" 
                                height="256" 
                                className="mx-auto" 
                                style={{ imageRendering: 'pixelated' }}
                            />
                        )}
                    </div>
                </div>

                <div className="relative mt-4 flex-shrink-0">
                    <input
                        type="text"
                        placeholder={`Speak with ${target.title}...`}
                        className="w-full bg-[#0F110C] border-2 border-[#F28500] text-white p-3 pr-24 focus:outline-none focus:border-[#FF5964] font-mono"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-3">
                        <button className="text-[#F28500] hover:text-white">
                            <FaMicrophone size={20} />
                        </button>
                        <button className="text-[#F28500] hover:text-white">
                            <IoSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractionPanel;