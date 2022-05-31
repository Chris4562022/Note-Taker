const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./Develop/data/db');
const fs = require('fs');
const path = require('path');



// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

app.get('/api/Develop/db', (req, res) => {
  let results = notes;
  console.log(req.query)
  res.json(notes);
});

function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  }
  if (query.text) {
    filteredResults = filteredResults.filter(note => note.text === query.text);
  }
  if (query.id) {
    filteredResults = filteredResults.filter(note => note.id === query.id);
  }
  return filteredResults;
}



function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './Develop/data/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}


function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  // if (!animal.diet || typeof animal.diet !== 'string') {
  //   return false;
  // }
  // if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
  //   return false;
  // }
  // return true;
}


app.get('/api/Develop/db', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.post('/api/Develop/db', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});



app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});