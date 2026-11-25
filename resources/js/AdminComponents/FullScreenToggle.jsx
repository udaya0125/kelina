import React, { useState, useEffect } from 'react';
import { AiOutlineFullscreen } from "react-icons/ai";
import { IoExpand } from 'react-icons/io5';

const FullScreenToggle = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            // Request full screen
            document.documentElement.requestFullscreen();
        } else {
            // Exit full screen
            document.exitFullscreen();
        }
    };

    const handleFullScreenChange = () => {
        setIsFullScreen(!!document.fullscreenElement);
    };

    useEffect(() => {
        // Listen for fullscreen change events
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    return (
        
            <button onClick={toggleFullScreen}>
                <IoExpand className='text-xl text-saitblue'/>
            </button>
        
    );
};

export default FullScreenToggle;