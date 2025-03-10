import { useEffect, useRef, useState } from "react";
import { setNewOffset, autoGrow, setZIndex } from "../utils";
import Spinner from "../icons/Spinner";
import DeleteButton from "../components/DeleteButton";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { UPDATE_NOTE } from "../graphql/queries";
import { useMutation } from "@apollo/client";


const NoteCard = ({ note }) => {
    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const { setSelectedNote } = useContext(NotesContext);

    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const [position, setPosition] = useState(note.position);
    const colors = note.colors;
    const description = note.description;

    const textAreaRef = useRef(null);

    const [updateNoteMutation] = useMutation(UPDATE_NOTE);
    
    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, []);

    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;

            setZIndex(cardRef.current);

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
            setSelectedNote(note);
        }
    };

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
    };

    const mouseUp = async () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            console.log("Api call: update note's description", payload);
            await updateNoteMutation({
                variables: {
                    id: note.id,
                    ...payload
                },
            });

        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    const handleKeyUp = async () => {
        setSaving(true);
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            console.log("Timer started");
            saveData("description", textAreaRef.current.value);
        }, 2000);
    };

    return (
        <div
            ref={cardRef}
            className="card"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: colors.colorBody,
                
            }}
        >
            <div
                onMouseDown={mouseDown}
                className="card-header"
                style={{
                    backgroundColor: colors.colorHeader,
                }}
            >
                <DeleteButton noteId={note.id} />

                {saving && (
                    <div className="card-saving">
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText }}>
                            Saving...
                        </span>
                    </div>
                )}
            </div>
            <div className="card-body">
                <textarea
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                        setSelectedNote(note);
                    }}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={description}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
