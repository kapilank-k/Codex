// src/components/UI/PixelArtBackground.jsx

import React from 'react';

const PixelArtBackground = () => {
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        const config = { starColor: '#20C20E', starCount: 200, pixelSize: 8, twinkleSpeed: 0.05 };
        let stars = [];
        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = [];
            for (let i = 0; i < config.starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    opacity: Math.random(),
                    fade: Math.random() > 0.5 ? 'in' : 'out',
                });
            }
        };
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F110C';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = config.starColor;
            stars.forEach(star => {
                if (star.fade === 'in') {
                    star.opacity += config.twinkleSpeed;
                    if (star.opacity > 1) { star.opacity = 1; star.fade = 'out'; }
                } else {
                    star.opacity -= config.twinkleSpeed;
                    if (star.opacity < 0) {
                        star.opacity = 0; star.fade = 'in';
                        star.x = Math.random() * canvas.width;
                        star.y = Math.random() * canvas.height;
                    }
                }
                ctx.globalAlpha = star.opacity;
                ctx.fillRect(star.x, star.y, config.pixelSize, config.pixelSize);
            });
            ctx.globalAlpha = 1.0;
            animationFrameId = requestAnimationFrame(animate);
        };
        const handleResize = () => setup();
        setup();
        animate();
        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};
export default PixelArtBackground;