const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const manifestPath = path.join('public', 'manifest.json');

// Read manifest.json
const manifestJson = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Update version
manifestJson.version = packageJson.version;

// Write back manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2) + '\n');

console.log(`Updated manifest.json version to ${packageJson.version}`);