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

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: theme => ({
                    'Hearts': "url('storage/images/Hearts.svg')",
                    'Clubs': "url('storage/images/Clubs.svg')",
                    'Diamonds': "url('storage/images/Diamonds.svg')",
                    'Spades': "url('storage/images/Spades.svg')",
            }),
            screens: {
                'tall': { 'raw': '(min-height: 1024px)' },
                'medium': { 'raw': '(min-height: 800px) (max-height: 1023px)' },
                // => @media (min-height: 800px) { ... }
              }
        },
    },

    plugins: [forms],
};
