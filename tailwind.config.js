module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
				// add color here by using - propertyName: "HEX,RGB,HSL", don't forget the quotes! ( Example -> color1: "#000000", next color..)
				navbarColor: "#616265",
				hoverColor: "#F0D582",
				bgColor: "#E5A478",
			},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
