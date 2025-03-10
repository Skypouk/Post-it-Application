import Trash from "../icons/Trash";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { DELETE_NOTE } from "../graphql/queries";
import { useMutation } from "@apollo/client";


const DeleteButton = ({ noteId }) => {
    const { setNotes } = useContext(NotesContext);
    const [deleteNoteMutation] = useMutation(DELETE_NOTE);
    
    const handleDelete = async (e) => {
        console.log("Api call: delete note", noteId)
        await deleteNoteMutation({
            variables: {
                id: noteId,
            },
        });

        setNotes((prevState) =>
            prevState.filter((note) => note.id !== noteId)
        );
    };
    return (
        <div onClick={handleDelete}>
            <Trash />
        </div>
    );
};

export default DeleteButton;
