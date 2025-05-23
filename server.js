const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('notes.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT

  )`);
});

app.get('/api/notes', (req, res) => {
  db.all('SELECT * FROM notes', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.get('/api/notes/:id', (req, res) => {
  db.get('SELECT * FROM notes WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err);
    res.json(row);
  });
});

app.post('/api/notes', (req, res) => {
  const {title, content } = req.body;
  if (!title || !content) return res.status(400).send('Invalid input');
  db.run('INSERT INTO notes (title, content) VALUES (?, ?, ?, ?)', [title, content], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ id: this.lastID });
  });
});


app.delete('/api/notes/:id', (req, res) => {
  db.delete('DELETE FROM notes (title, content) VALUES (?, ?, ?, ?)', [title, content], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ id: this.lastID });
  });
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));