/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    container: {
      center: true,
    },
    extend: {
      transitionProperty: {
        spacing: 'margin, padding',
      },
      colors: {
        primary: "#ffffff",
        secondary: "#8744E1",
        danger: "#FE718E",
        success: "#1BD8BA"
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        sm: ['13px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
      backgroundColor: {
        'main-bg': '#F5F5F5',
        'secondary-bg': '#ffffff'
      },
      boxShadow: {
        shadow: '0px 20px 50px rgba(0, 0, 0, 0.1)'
      },
      border: {
        'border-main': '#BDBDBD'
      }
    },
    screens: {
      xss: "320px",
      xs: "480px",
      sm: "660px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require('@tailwindcss/forms')

  ],
};

