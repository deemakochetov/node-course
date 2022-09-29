const fs = require('fs');
const logUtils = require('./logging');

const storageFile = 'notes.json';

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync(storageFile, notesJSON);
};

const listNotes = () => {
  try {
    const dataBuffer = fs.readFileSync(storageFile);
    const notes = JSON.parse(dataBuffer.toString());
    return notes;
  } catch (err) {
    return {};
  }
};

const addNote = (title, body) => {
  const notes = listNotes();
  if (title in notes) {
    logUtils.logFailure(
      `Choose another title. Note with title "${title}" already exists`
    );
    return;
  }
  notes[title] = body;
  saveNotes(notes);
  logUtils.logSuccess(
    `New note with title "${title}" has been added successfully!`
  );
};

const removeNote = (title) => {
  const notes = listNotes();
  if (title in notes) {
    delete notes[title];
    saveNotes(notes);
    logUtils.logSuccess(
      `The note with the title "${title}" has been successfully deleted`
    );
  } else {
    logUtils.logFailure(
      `The note with the title "${title}" has not been found`
    );
  }
};

const getNotes = () => {
  const notes = listNotes();
  if (Object.keys(notes).length === 0) {
    logUtils.logFailure('No notes yet');
  }
  logUtils.logSuccess('Your notes');
  Object.keys(notes).forEach((key) => logUtils.logNeutral(key));
};

const readNote = (title) => {
  const notes = listNotes();
  const note = notes[title];
  if (note) logUtils.logNeutral(note);
  else logUtils.logFailure(`The note with title "${title}" doesn't exist`);
};

module.exports = { addNote, listNotes, removeNote, getNotes, readNote };
