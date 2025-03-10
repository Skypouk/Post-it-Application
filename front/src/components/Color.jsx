import React from "react";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { UPDATE_NOTE } from "../graphql/queries";
import { useMutation } from "@apollo/client";


const Color = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NotesContext);

    const [updateNoteMutation] = useMutation(UPDATE_NOTE);
    const changeColor = async () => {
        try {
            const currentNoteIndex = notes.findIndex(
                (note) => note.id === selectedNote.id
            );

            const updatedNote = {
                ...notes[currentNoteIndex],
                colors: color,
            };

            const newNotes = [...notes];
            newNotes[currentNoteIndex] = updatedNote;
            setNotes(newNotes);

            console.log("Api call: change note's color", color)
            await updateNoteMutation({
                variables: {
                    id: selectedNote.id,
                    colors: JSON.stringify(color),
                },
            });

        } catch (error) {
            console.error("Error updating note color:", error);
            alert("You must select a note before changing colors");
        }
    };

    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;
