import React ,{ useEffect, useState} from "react";
import {
  RiCloseLine,
  RiDeleteBinLine,
  RiStarLine,
  RiPushpinLine,
  RiMore2Fill,
  RiStarFill,
} from "@remixicon/react";

const NoteEditor = ({onAddNote,selectedNote,onUpdateNote ,onDeleteNote ,onClosedEditor ,onToggleFav,onTogglePin,onToggleArchived}) => {
  const [title,setTitle]=useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("bg-yellow-100");
  useEffect(() => {
  if (selectedNote) {
    setTitle(selectedNote.title);
    setContent(selectedNote.content);
    setColor(selectedNote.color );
  } else {
    setTitle("");
    setContent("");
    setColor("bg-yellow-100");
  }
}, [selectedNote]);
 const colors = [
  "bg-yellow-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-red-100",
  "bg-purple-100",
  "bg-white",
];
  
  const handleSave = () => {
  const cleanTitle = title.trim();
  const cleanContent = content.trim();
  console.log(selectedNote);

  if (cleanTitle === "" && cleanContent === "") {
    console.log("Empty note - not saving");
    return;
  }
  if(selectedNote){
    onUpdateNote(selectedNote.id,{
      title :cleanTitle,
      content : cleanContent,
      color: color

    })
    onClosedEditor();
    return;

  }

  const newNote = {
    id: Date.now(),
    title: cleanTitle,
    content: cleanContent,
    color: color,
    date: "Today",
    favorite: false,
    pinned: false,
    archived:false,
    trashed:false,
  };

  onAddNote(newNote);
  onClosedEditor();

  setTitle("");
  setContent("");
};


  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Editor */}
        <div className={`
    overflow-hidden
    rounded-2xl
    border border-gray-200
    ${color}
    shadow-lg
  `}
>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
                Editing note
              </p>

              <h2 className="mt-0.5 text-sm font-semibold text-gray-700">
                
              </h2>
            </div>

            <button onClick={onClosedEditor}
              type="button"
              aria-label="Close editor"
              className="
                rounded-full p-2
                text-gray-400
                transition
                hover:bg-gray-100
                hover:text-gray-700
              "
            >
              <RiCloseLine size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-6">

            {/* Title */}
            <input value={title} onChange={(e)=>{
              setTitle(e.target.value);
            }}
              type="text"
              placeholder="Title"
              className="
                w-full
                border-none
                bg-transparent
                text-2xl
                font-semibold
                text-gray-800
                placeholder:text-gray-300
                outline-none
              "
            />

            {/* Content */}
            <textarea
            value={content}
            onChange={(e)=>{
              setContent(e.target.value);
            }}
              placeholder="Start writing your note..."
              className="
                mt-4
                min-h-64
                w-full
                resize-none
                border-none
                bg-transparent
                text-sm
                leading-7
                text-gray-600
                placeholder:text-gray-300
                outline-none
              "
            />
            {/* Color Picker */}
<div className="mb-4 flex items-center gap-2">
  <span className="text-sm text-gray-500">
    Color:
  </span>
    {colors.map((colorOption) => (
    <button
      key={colorOption}
      type="button"
      onClick={() => setColor(colorOption)}
      className={`
        h-7 w-7 rounded-full border-2
        ${colorOption}
        ${
          color === colorOption
            ? "border-gray-800"
            : "border-gray-300"
        }
      `}
      aria-label={`Select ${colorOption}`}
    />
  ))}

  
</div>
            

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">

              <div className="flex items-center gap-1">
               <button
                 onClick={() => {
                    if (selectedNote) {
                    onDeleteNote(selectedNote.id);
                    onClosedEditor();
                      }
                    }}
               type="button"className=" rounded-lg p-2text-gray-400transition hover:bg-gray-100 hover:text-red-500"ria-label="Delete note">
                  <RiDeleteBinLine size={19} />
                 </button>
                <button  
                 onClick={() => {
                  if (selectedNote) {
                   onToggleFav(selectedNote.id);  } }}
                  type="button"
                  className="
                    rounded-lg p-2
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-yellow-500
                  "
                  aria-label="Favorite note"
                >
                   {selectedNote?.favorite ? (
  <RiStarFill
    size={19}
    className="text-yellow-500"
  />
) : (
  <RiStarLine size={19} />
)}
                </button>

                <button onClick={() => {
    if (selectedNote) {
      onTogglePin(selectedNote.id);
    }
  }}
                  type="button"
                  className="
                    rounded-lg p-2
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                  aria-label="Pin note"
                >
                  <RiPushpinLine size={19} />
                </button>

                <button
                  type="button"
                  className="
                    rounded-lg p-2
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                  aria-label="More options"
                >
                  <RiMore2Fill size={19} />
                </button>
              </div>

              <button onClick={handleSave}
                type="button"
                className="
                  rounded-xl
                  bg-cyan-600
                  px-5 py-2.5
                  text-sm font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:bg-cyan-700
                  hover:shadow-md
                  active:scale-[0.98]
                "
              >
                Save note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default NoteEditor;