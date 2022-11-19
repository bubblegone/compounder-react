/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            'transparent': 'transparent',
            'light-blue': '#DBEDEE',
            'white': '#FFFFFF',
            'very-dark-green': '#001514',
        },
        fontFamily: {
            raleway: ['Raleway', 'sans-serif'],
            quicksand: ['Quicksand1', 'sans-serif'],
        },
    },
    plugins: [],
};
