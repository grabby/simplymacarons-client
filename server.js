const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static('dist'));

// Handle clean URLs for HTML pages
const routes = [
  '/',
  '/blog',
  '/cart',
  '/invoice',
  '/admin',
  '/macaron-care'
];

routes.forEach(route => {
  app.get(route, (req, res) => {
    let filePath = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    res.sendFile(path.join(__dirname, 'dist', filePath));
  });
});

// Handle any other routes by serving index.html (for SPA-like behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
}); 