import React ,{useState ,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import NoteEditor from "./components/noteEditor";
import Notelist from "./components/noteList";
import TrashPage from "./components/trash";
import "./App.css";


const App = () => {
  const[selectedNote,setSelectedNote]=useState(null);
  const[isEditorOpen,setIsEditorOpen]=useState(false);
  const[searchTerm,setSearchTerm]=useState("")
  const [activeFilter, setActiveFilter] = useState("all");
  const [notes,setNotes]=useState([
    
       
  {id: 1,
  title: "My first note",
  content: "Here it is",
  color: "bg-yellow-100",
  date: "Today",
  favorite: false,
  pinned: false,
  archived:false,
  trashed:false,

    }


  ])
  useEffect(() => {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes) {
    setNotes(JSON.parse(savedNotes));
  }
}, []);

useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);
  const filteredNotes = notes.filter((note) => {

  const matchesSearch =
    (note.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.content || "").toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter =
  activeFilter === "all" &&
    note.archived === false &&
    note.trashed === false ||

  activeFilter === "favorite" &&
    note.favorite === true &&
    note.archived === false &&
    note.trashed === false ||

  activeFilter === "pinned" &&
    note.pinned === true &&
    note.archived === false &&
    note.trashed === false ||

  activeFilter === "archived" &&
    note.archived === true &&
    note.trashed === false ||

  activeFilter === "trash" &&
    note.trashed === true; 

  return matchesSearch && matchesFilter;
});
  const openNewNote=()=>{
    setSelectedNote(null);
    setIsEditorOpen(true);
  }


  const closeEditor = () => {
  setSelectedNote(null);
  setIsEditorOpen(false);
   }; 
  const updateNote=(id,updatedData)=>{
    setNotes((previousNotes)=>{
    return previousNotes.map((note)=>{
      if(note.id===id){
        return {...note,
          ...updatedData
        }
        
      }
      return note ;
    })})
  }

  const selectNote=(id)=>{
    const note=notes.find(note =>note.id===id)
    setSelectedNote(note)
    setIsEditorOpen(true)
    console.log(note);
  }

  const addNote=(newNote)=>{
    setNotes((previousNotes) => {
      return ([...previousNotes,newNote])

    })


  }

  const toggleFavorite = (id) => {
  setNotes((previousNotes) => {
    return previousNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          favorite: !note.favorite,
        };
      }

      return note;
    });
  });
};
 const togglePinned = (id) => {
  setNotes((previousNotes) => {
    return previousNotes.map((note) => {
      if (note.id === id) {
        const updatedNote = {
          ...note,
          pinned: !note.pinned,
        };

        setSelectedNote((previousSelected) => {
          if (previousSelected?.id === id) {
            return updatedNote;
          }

          return previousSelected;
        });

        return updatedNote;
      }

      return note;
    });
  });
};
  const toggleArchived=(id)=>{
    setNotes((previousNotes) => {
    return previousNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          archived: !note.archived,
        };
      }

      return note;
    });
  });
};
  
const deleteNote = (id) => {
  setNotes((previousNotes) => {
    return previousNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          trashed: true,
          pinned: false,
          archived: false,
        };
      }

      return note;
    });
  });

  if (selectedNote?.id === id) {
    setSelectedNote(null);
    setIsEditorOpen(false);
  }
};
const permanentlyDeleteNote = (id) => {
  setNotes((previousNotes) => {
    return previousNotes.filter((note) => note.id !== id);
  });
};

const emptyTrash = () => {
  setNotes((previousNotes) => {
    return previousNotes.filter((note) => note.trashed === false);
  });
};

const restoreNote = (id) => {
  setNotes((previousNotes) => {
    return previousNotes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          trashed: false,
        };
      }

      return note;
    });
  });
};


return (
  <Routes>
    <Route
      path="/"
      element={
        <div className="flex h-screen overflow-hidden bg-gray-50">
          
          <Sidebar 
            notes={notes}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onNewNote={openNewNote}
            onEmptyTrash={emptyTrash}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            
            <Header 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <main className="min-h-0 flex-1 overflow-y-auto">

              {isEditorOpen && (
                <NoteEditor 
                  onAddNote={addNote}
                  selectedNote={selectedNote}
                  onUpdateNote={updateNote}
                  onDeleteNote={deleteNote}
                  onClosedEditor={closeEditor}
                  onToggleFav={toggleFavorite}
                  onTogglePin={togglePinned}
                  onToggleArchived={toggleArchived}
                />
              )}

              <Notelist 
                notes={filteredNotes}
                onToggleFav={toggleFavorite}
                onTogglePin={togglePinned}
                onDeleteNote={deleteNote}
                onSelectedNote={selectNote}
                onNewNote={openNewNote}
                onToggleArchived={toggleArchived}
                onRestoreNote={restoreNote}
                onPermanentlyDeleteNote={permanentlyDeleteNote}
              />

            </main>
          </div>
        </div>
      }
    />

    <Route
      path="/trash"
      element={
        <TrashPage
      notes={notes}
      onRestoreNote={restoreNote}
      onPermanentlyDeleteNote={permanentlyDeleteNote}
    />
      }
    />
  </Routes>
);}

export default App;