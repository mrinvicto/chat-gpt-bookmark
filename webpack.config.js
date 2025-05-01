const path = require('path');

module.exports = {
  // Multiple entry points
  entry: {
    background: './src/background/background.ts',  // Background script entry point
    content: './src/content/content.ts',        // Content script entry point
  },
  output: {
    // Separate output files for background and content scripts
    filename: '[name].bundle.js',        // Output filename based on entry name (background.bundle.js, content.bundle.js)
    path: path.resolve(__dirname, 'public'), // Output directory
  },
  resolve: {
    extensions: ['.ts', '.js'],  // Resolve .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,            // Transpile TypeScript files
        use: 'ts-loader',         // Use ts-loader for TypeScript compilation
        exclude: /node_modules/,  // Exclude node_modules
      },
    ],
  },
  mode: 'production', // Use production mode for optimization
};
