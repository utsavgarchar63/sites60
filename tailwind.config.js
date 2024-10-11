/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // template3 colors
        Temp3color1: "#dafefc",
        Temp3color2: "#1e2430",
        Temp3color3: "#707070",
        Temp3color4: "#dafofa",
        // Template5 colors
        Temp5color1: "#574791",
        Temp5color2: "#f7f7f7",
        Temp5color3: "#dcd4f7",
        Temp5color4: "#707070",
        Temp5color5: "#d5cef3",
        Temp5color6: "#f5f4fa",
        // Template6colors
        Temp6color1: "#1881ba",
        Temp6color2: "#707070",
        Temp6color3: "#f7f9ff",
        Temp6color4: "#e9f3f8",
        // Tempalte7colors
        Temp7color1: "#7c8ce3",
        Temp7color2: "#2c2f3c",
        Temp7color3: "#707070",
        Temp7color4: "#d0d0d0",
        // Template8colors
        Temp8color1: "#232b2d",
        Temp8color2: "#97c9ce",
        Temp8color3: "#2b3436",
        Temp8color4: "#daf0fa",
        // Portfolio
        Portfoliocolor1: "#000f1f",
        Portfoliocolor2: "#00acff",
        Portfoliocolor3: "0facff",
        Portfoliocolor4: "#012a44",
        // insurance
        insurancecolor1: "#447D98",
        insurancecolor2: "#393A52",
        insurancecolor3: "#EFFAFF",
        insurancecolor4: "#EFFAFF",
        insurancecolor5: "#E4e4e4",

        // customblue: "#DAF3FC",
        // customblue1: "#DAF0FA",
        // customblue6: "#1881BA",
        // herot6: "#F7F9FF",
        // herot61: "#1881BA",
        // texth6: "#1881BA",
        // customt3: "#1E2430",
        // customt31: "#707070",
        // customt32: "#ffffff",
        // customt5: "#574791",
        // customt51: "#DCD4F7",
        // customblack: "#232B2D",
        // customt8: "#97C9CE",
        // customtbg: "#2B3436",
        // transparent: "transparent",
        // herot7: "#7C8CE3",
        // herot71: "#F5F6F8",
        // contactt7: "#2C2F3C",
        // contactt5: "#F5F4FA",
        // tt6: "#E9F3F8",
        // ft6: "#232B2D",
        // textt5: "#F7F7F7",
        // primarycolor: "#0FACFF",
        // secondarycolor: "#ffffff",
        // backgroundcolor: "#000F1F",
        // herobg3: "#012A44",
        // bordercolor: "#000F1F",
        // cardbackground: "#012A44",
        // bordercolor1: "#000F1F",
        // insurancecolor: "#447D98",
        // insurancecolor1: "#393A52",
        // insurancecolor2: "#707070",
        // insurancecolor3: "#EFFAFF",
      },

      backgroundColor: {
        temp1bg: "#00A7FF",
        customgray: "#F7F7F7",
        temp4bg: "#465F63",
        temp4bggreen: "#F2F4F1",
        customblack: "#232B36",
        custombgorange: "#F9582C",
        custombg: "#27333F",
        "custom-tints": "#FFF7EF",
        customtint: "#AD4A50",
        custom: "#F4E1D1",
      },

      textColor: {
        temp1text: "#00A7FF",
        "custom-gray": "#707070",
        temp4text: "#465F63",
        temp2text: "#F9582C",
        customwhite: "#FFFFFF",
        yogatext: "#AD4A50",
        yogatext2: "#6E1C21",
        yogatext3: "#FFF7EF",
      },
      // fontSize: {
      //   "32px": "32px",
      //   "36px": "36px",
      //   "24px": "24px",
      //   "20px": "20px",
      //   "78px": "78px",
      //   "28px": "28px",
      //   "60px": "50px",
      //   "57px": "57px",
      //   "70px": "70px",
      //   "26px": "26px",
      //   "16px": "16px",
      //   "22px": "22px",
      //   "18px": "18px",

      // },
      fontSize: {
        //12px
        // xs: [
        //   "0.75rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //14px
        // sm: [
        //   "0.875rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //16px
        // base: [
        //   "1rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //18px
        // lg: [
        //   "1.125rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //20px
        // xl: [
        //   "1.25rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //24px
        // "2xl": [
        //   "1.5rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //30px
        // "3xl": [
        //   "1.875rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //36px
        // "4xl": [
        //   "2.25rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //48px
        // "5xl": [
        //   "3rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //60px
        // "6xl": [
        //   "4rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //72px
        // "7xl": [
        //   "5rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //96px
        // "8xl": [
        //   "6rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
        // //128px
        // "9xl": [
        //   "8rem",
        //   { lineHeight: "0", letterSpacing: "0", fontWeight: "0" },
        // ],
      },

      // fontWeight: {
      //   light: 300,
      // },
      fontFamily: {
        poppins: ["Poppins", "sans"], // Use 'Poppins' as the font name
      },
      // borderColor: {
      //   "custom-border": "#DFE4DE",
      //   "custom-orange": "#F9582C",
      //   customgray: "#ABABAB",
      //   temp4bggreen: "#707070",
      //   "custom-tint": "#AD4A50",
      //   customwhite: "#FEF7EC",
      // },
      // height: {},
      // width: {
      //   custom: "806px",
      //   "810px": "600px",
      // },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
};
