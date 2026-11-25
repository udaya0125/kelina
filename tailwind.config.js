import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
//FigTree

// green
// #217945
// blue
// #287DB3
    theme: {
        extend: {
            backgroundImage: {
                'multi-gradient': 'linear-gradient(to right, #FF6B6B, #4ECDC4, #45B7D1, #FFA07A, #9C27B0)',
            },
            fontFamily: {
                sans: ['Google Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                
                 //tertiary: '#0D5B91',
                 tertiary:'#287DB3', 
                //tertiary:'#217945',
                primary:'#98bdFF', 
                secondaryone: '#7DA0FA', 
                secondarytwo: '#7978E9', 
                secondarythree: '#F37979E',
                saitorange: '#FCB040', 
                saitblue: '#0F75BC'
            },
            animation: {
              shine: 'shine 1.5s',
              gradientx: 'gradientx 3s linear infinite',
            }, 
            keyframes: {
              shine: {
                '100%' : {left: '125%'},
              },
              gradientx: {
                '0%, 100%': {
                  'background-size': '200% 100%',
                  'background-position': 'left center'
                },
                '50%': {
                  'background-size': '200% 100%',
                  'background-position': 'right center'
                }
              }
            }
        },
    },

    plugins: [forms, require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                  "primary": "#0B80A1",
                  "secondary": "#063F78",
                //   "accent": "#1A73E8",
                "accent":"#f3f4f6",

                // "accent":"#e5e7eb",
                  "neutral": "#3d4451",
                  "base-100": "#ffffff",
                  
                },
              },
              {
                darktheme: {
                  "primary": "#1E3A8A",
                  "secondary": "#1D4ED8",
                //    "accent": "#393E46",
                 "accent": "#222831",
                  "neutral": "#2e2e2e",
                  "base-100": "#393E46",
                  
                },
              },

        ],
        //darkTheme: "light",
        base: false, // very important - this prevents DaisyUI from overriding your base styles
        styled: true,
        utils: true,
        prefix: "", // optional: add a prefix to all daisyUI classes
        logs: false,
    }
};


// tertiary: '#488A99'