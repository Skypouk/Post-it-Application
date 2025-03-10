import { createContext, useState, useEffect, useRef } from "react";
import Spinner from "../icons/Spinner";
import { fakeData as fake_notes } from "../assets/fakeData.js";
import { GET_NOTES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState([]);

    const isDataFetched = useRef(false);

    const { loading: queryLoading, error, data } = useQuery(GET_NOTES, {
        fetchPolicy: "network-only",
        skip: isDataFetched.current,
    });

    useEffect(() => {
        if (data && !isDataFetched.current) {
            console.log("Api call: get all notes");
            isDataFetched.current = true;

            const transformedNotes = data.getNotes.map((note) => ({
                id: note.id,
                description: note.description,
                colors: {
                    colorName: note.colors.colorName,
                    colorHeader: note.colors.colorHeader,
                    colorBody: note.colors.colorBody,
                    colorText: note.colors.colorText,
                },
                position: {
                    x: note.position.x,
                    y: note.position.y,
                },
            }));

            setNotes(transformedNotes);
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.error(error);
            setNotes(fake_notes);
            setLoading(false);
        }
    }, [error]);

    const contextData = { notes, setNotes, selectedNote, setSelectedNote };

    return (
        <NotesContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
        </NotesContext.Provider>
    );
};

export default NotesProvider;
