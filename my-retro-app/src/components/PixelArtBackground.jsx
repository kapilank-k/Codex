import React from 'react';

// This component creates a subtle, twinkling starfield effect.
// It uses a canvas element for performance and is designed to sit behind all other content.
const PixelArtBackground = () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration for the stars
        const config = {
            starColor: '#20C20E', // Matches your button color
            starCount: 200,
            pixelSize: 8,
            // --- VALUE CHANGED HERE ---
            // Decreased from 0.05 to make the twinkle effect slower.
            twinkleSpeed: 0.01,
        };

        let stars = [];

        // Function to initialize or reset stars
        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = [];
            for (let i = 0; i < config.starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    opacity: Math.random(),
                    // Direction of opacity change (fading in or out)
                    fade: Math.random() > 0.5 ? 'in' : 'out',
                });
            }
        };

        // Animation loop
        const animate = () => {
            // Clear the canvas each frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Fill the background with the desired color
            ctx.fillStyle = '#0F110C';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw each star
            ctx.fillStyle = config.starColor;
            stars.forEach(star => {
                // Update opacity to create twinkle effect
                if (star.fade === 'in') {
                    star.opacity += config.twinkleSpeed;
                    if (star.opacity > 1) {
                        star.opacity = 1;
                        star.fade = 'out';
                    }
                } else {
                    star.opacity -= config.twinkleSpeed;
                    if (star.opacity < 0) {
                        star.opacity = 0;
                        star.fade = 'in';
                         // Respawn star in a new location for a continuous effect
                        star.x = Math.random() * canvas.width;
                        star.y = Math.random() * canvas.height;
                    }
                }
                
                // Set the star's current opacity
                ctx.globalAlpha = star.opacity;
                // Draw the star as a small square (pixel)
                ctx.fillRect(star.x, star.y, config.pixelSize, config.pixelSize);
            });
            
            // Reset global alpha
            ctx.globalAlpha = 1.0;
            
            animationFrameId = requestAnimationFrame(animate);
        };

        // Event listener for window resize
        const handleResize = () => {
            setup();
        };

        // Initial setup and start animation
        setup();
        animate();
        
        window.addEventListener('resize', handleResize);

        // Cleanup function to stop animation and remove event listener when component unmounts
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default PixelArtBackground;