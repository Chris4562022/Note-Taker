const fs = require("fs");

const {
    filterByQuery,
    findById,
    createNewNote
    // validateNote,
} = require("../../lib/notes.js");

const { notes } = require("../data/db");

test("creates an note object", () => {
    const note = createNewNote(
        { title: "sample title", text: "sample text sample text" },
        notes
    );

    expect(note.title).toBe("sample title");
    expect(note.text).toBe("sample text sample text");
});

test("filters by query", () => {
    const startingNotes = [
        {
            title: "Shopping",
            text: "Go To Shoprite"
        },
        {
            title: "Clean Up",
            text: "Do Dishes"
        },
    ];

    
});

test("finds by id", () => {
    const startingNotes = [
        {
            id: "4",
            title: "Clean Up",
            text: "Do Dishes"

        },
        {
            id: "5",
            title: "Make Breakfast",
            text: "5"

        },
    ];

    const result = findById("4", startingNotes);

    expect(result.title).toBe("Clean Up");
});



//   const result = validateNote(note);
//   const result2 = validateNote(invalidNote);

//   expect(result).toBe(true);
//   expect(result2).toBe(false);
