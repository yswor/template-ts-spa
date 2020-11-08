module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@containers': './src/containers',
          '@routes': './src/routes',
          '*': './',
        },
      },
    ],
  ],
}
