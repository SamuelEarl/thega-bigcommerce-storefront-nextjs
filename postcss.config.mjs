/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["./src/assets/styles/media-queries.css"],
    },
    "postcss-custom-media": {},
    "autoprefixer": {},
  },
};

export default config;
