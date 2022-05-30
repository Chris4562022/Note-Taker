const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./Develop/data/db');


app.get('/api/Develop/db', (req, res) => {
    let resulte = notes;
    console.log(req.query)
    res.json(notes);
});

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    // if (query.name) {
    //   filteredResults = filteredResults.filter(animal => animal.name === query.name);
    // }
    return filteredResults;
  }


app.get('/api/Develop/db', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });



  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });