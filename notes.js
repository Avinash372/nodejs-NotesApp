const fs = require("fs");
const chalk = require("chalk");

const getNotes = (title) => {
    const buffer = fs.readFileSync("notes.json");
    const bufferStr = buffer.toString();
    return JSON.parse(bufferStr);
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.find((note) => note.title === title);
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("Note Added.."));
    } else {
        console.log(chalk.red.inverse("Note title already taken!"));
    }

    saveNotes(notes);
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const bufferString = dataBuffer.toString();
        const data = JSON.parse(bufferString);
        return data;
    } catch (err) {
        return [];
    }
};

const listAll = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Your Notes"));
    notes.forEach((note, indx) =>
        console.log(chalk.yellow(indx + 1), chalk.green(note.title))
    );
};

const removeNote = (title) => {
    const data = loadNotes();
    const filteredNote = data.filter((a) => a.title !== title);
    if (data.length > filteredNote) {
        console.log(chalk.bgGreen("Note Removed!"));
        saveNotes(filteredNote);
    } else console.log(chalk.bgRed("Note not Found!"));
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red("Note Not Found"));
    }
};
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listAll: listAll,
    readNote: readNote,
};
