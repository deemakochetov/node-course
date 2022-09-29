const fs = require('fs');

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
    console.log(`Choose another title. Title ${title} already exists`);
    return;
  }
  notes[title] = body;
  saveNotes(notes);
  console.log('New note has been added successfully!');
};

const removeNote = (title) => {
  const notes = listNotes();
  if (title in notes) {
    delete notes[title];
    saveNotes(notes);
    console.log(
      `The note with the title ${title} has been successfully deleted`
    );
  } else {
    console.log(`The note with the title ${title} has not been found`);
  }
};

module.exports = { addNote, listNotes, removeNote };
