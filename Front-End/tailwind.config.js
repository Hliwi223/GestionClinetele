/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./src/**/*.{html,tsx,js,ts}",flowbite.content(),"./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      spacing: {
        '72.5': '18.125rem',
      },
    },
  },
  plugins: [
      require('tailwind-scrollbar-hide'),
     require('flowbite/plugin'),
  ],
}

