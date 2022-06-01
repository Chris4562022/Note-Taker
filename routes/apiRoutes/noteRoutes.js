const router = require('express').Router();
const { notes } = require('../../Develop/data/db');

const { createNewNote, deleteNote } = require('../../lib/notes.js');

const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
  let saved = notes;
  res.json(saved);
});



router.post('/notes', (req, res) => {
  // set id(unique ID) based on what the next index of the array will be
  req.body.id = uuidv4().toString();
  //add animal to jsonn file and animals array in this function 
  let note = createNewNote(req.body, notes);
  res.json(note);
})

router.delete('/notes/:id', (req, res) => {
  deleteNote(notes, req.params.id)
  res.json(notes);
})

module.exports = router;