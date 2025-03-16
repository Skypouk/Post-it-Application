import React from "react";
import Plus from "../icons/Plus";
import colors from "../assets/colors.json";
import { useRef } from "react";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { CREATE_NOTE } from "../graphql/queries";
import { useMutation } from "@apollo/client";


const AddButton = () => {
    const { setNotes } = useContext(NotesContext);
    const startingPos = useRef(110);
    const [createNoteMutation] = useMutation(CREATE_NOTE);

    const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
        };
        startingPos.current += 10;

        console.log("Api call: create empty note", payload)
        const response = await createNoteMutation({
            variables: payload
        });
        setNotes((prevState) => [response.data.createNote, ...prevState]);
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};

export default AddButton;
