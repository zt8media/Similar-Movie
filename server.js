const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Setting up middleware for SASS compilation
app.use(sassMiddleware({
    src: path.join(__dirname, 'styling'), // Source directory for SASS files
    dest: path.join(__dirname, 'frontend'), // Destination directory for CSS files
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/'  // Adjusted to the root of 'frontend' since styles.css is directly under 'frontend'
}));

// Serving static files from 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

