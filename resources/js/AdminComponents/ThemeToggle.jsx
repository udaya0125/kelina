import React, { useEffect, useState } from 'react';
import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('mytheme');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'mytheme';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const handleToggle = () => {
        const newTheme = theme === 'mytheme' ? 'darktheme' : 'mytheme';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button onClick={handleToggle} className=" btn-primary">
            {theme === 'mytheme' ? <MdDarkMode className='text-2xl text-saitblue'/> : <MdLightMode className='text-2xl text-saitblue'/>}
        </button>
    );
};

export default ThemeToggle;