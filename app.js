const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Read form data from POST requests
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Variable to store the user's name
let userName = "";

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
  userName = req.body.username;
  res.redirect('/greeting');
});

// Greeting page
app.get('/greeting', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Greeting</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="page">
        <div class="card greeting-card">
          <h1>Hello, ${userName}!</h1>
          <a href="/" class="back-link">Go Back</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});