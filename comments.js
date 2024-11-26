// Create web server


// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static files
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing comments.json');
                return;
            }
            res.send('Comment added');
        });
    });
},

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}));

// End of file