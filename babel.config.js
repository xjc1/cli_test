module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    ['@supermapgis/babel-plugin-import', {
      libraryName: '@supermapgis/iclient-leaflet',
      libraryDirectory: 'es',
      style: false,
    }],
  ],
};
