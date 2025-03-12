import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NotesContext";
import Banner from "./components/Banner";

function App() {
    return (
        <div id="app">
            <Banner/>
            <NotesProvider>
                <NotesPage />
            </NotesProvider>
        </div>
    );
}

export default App;
