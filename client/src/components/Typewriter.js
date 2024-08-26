import React, { useEffect, useState } from 'react';

const Typewriter = ({ texts, speed = 150 }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        let currentText = texts[textIndex];
        let index = 0;
        let interval;

        const type = () => {
            if (index < currentText.length) {
                setDisplayedText((prev) => prev + currentText.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                setTyping(false);
                setTimeout(() => {
                    setTyping(true);
                    setDisplayedText('');
                    setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }, 2000);
            }
        };

        if (typing) {
            interval = setInterval(type, speed);
        }

        return () => clearInterval(interval);
    }, [textIndex, typing, texts, speed]);

    return (
        <span>{displayedText}</span>
    );
};

export default Typewriter;