const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");
// Add,remove,read,list
//Command - Adding a note

yargs.command({
    command: "add",
    describe: "Add a note.",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => notes.addNote(argv.title, argv.body),
});
// Removing a note
yargs.command({
    command: "remove",
    describe: "Remove a note.",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => notes.removeNote(argv.title),
});

// Reading a note

yargs.command({
    command: "read",
    describe: "Read a note.",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => notes.readNote(argv.title),
});

// Listing out notes

yargs.command({
    command: "list",
    describe: "list all notes.",
    handler: () => notes.listAll(),
});

yargs.parse();
