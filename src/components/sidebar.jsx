import React from "react";
import {
  RiHomeLine,
  RiStarLine,
  RiArchiveLine,
  RiDeleteBinLine,
  RiSettingsLine,
  RiAddLine,
  RiPushpinLine,
} from "@remixicon/react";

const Sidebar = ( {activeFilter,onNewNote, notes,
  setActiveFilter, onEmptyTrash}) => {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-700 bg-gray-900 text-white">
      
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600 text-lg shadow-sm">
            📝
          </div>

          <h1 className="text-lg font-semibold tracking-tight">
            NoteApp
          </h1>
        </div>

        <button onClick={onNewNote}
          type="button"
          aria-label="Create new note"
          className="
            rounded-lg p-2
            text-gray-400
            transition
            hover:bg-gray-800
            hover:text-white
          "
        >
          <RiAddLine size={21} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
          Notes
        </p>

        <ul className="space-y-1">
          
          <li>
            <button onClick={
              ()=>{setActiveFilter("all")}}
              type="button"
              className="
                flex w-full items-center gap-3
                rounded-xl
                px-3 py-2.5  hover:bg-gray-800
                hover:text-white
                text-sm font-medium
                shadow-sm
              "
            >
              <RiHomeLine size={19} />
              <span>All Notes</span>

              <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs">
                {notes.length}
              </span>
            </button>
          </li>

          <li>
            <button onClick={()=>{setActiveFilter('favorite')}}
              type="button"
              className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-2.5
                text-sm text-gray-300
                transition
                hover:bg-gray-800
                hover:text-white
              "
            >
              <RiStarLine size={19} />
              <span>Favorites</span>

              <span className="ml-auto rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                 {notes?.filter(note => note.favorite).length}
              </span>
            </button>
          </li>

          <li>
            <button onClick={()=>{setActiveFilter("archived")}}
              type="button"
              className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-2.5
                text-sm text-gray-300
                transition
                hover:bg-gray-800
                hover:text-white
              "
            >
              <RiArchiveLine size={19} />
              <span>Archived</span>

              <span className="ml-auto rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                {notes.filter(note => note.archived).length}
              </span>
            </button>
          </li>

          <li>
            <button onClick={() => setActiveFilter("pinned")}
              type="button"
              className="
                flex w-full items-center gap-3
                rounded-xl px-3 py-2.5
                text-sm text-gray-300
                transition
                hover:bg-gray-800
                hover:text-white
              "
            >
              <RiPushpinLine size={19} />
              <span>Pinned</span>

              <span className="ml-auto rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                {notes?.filter(note => note.pinned).length}
              </span>
            </button>
          </li>
        </ul>

        {/* Labels */}
        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between px-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
              Labels
            </p>

            <button
              type="button"
              className="text-gray-500 transition hover:text-white"
              aria-label="Create label"
            >
              <RiAddLine size={16} />
            </button>
          </div>

          <ul className="space-y-1">
            {[
              ["Personal", "bg-yellow-400"],
              ["Work", "bg-blue-400"],
              ["Ideas", "bg-green-400"],
              ["Projects", "bg-purple-400"],
            ].map(([label, color]) => (
              <li key={label}>
                <button
                  type="button"
                  className="
                    flex w-full items-center gap-3
                    rounded-xl px-3 py-2
                    text-sm text-gray-300
                    transition
                    hover:bg-gray-800
                    hover:text-white
                  "
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-800 p-3">
        <button onClick={()=>{setActiveFilter("trash")}}
          type="button"
          className="
            mb-1 flex w-full items-center gap-3
            rounded-xl px-3 py-2.5
            text-sm text-gray-300
            transition
            hover:bg-gray-800
            hover:text-white
          "
        >
          <RiDeleteBinLine size={19} />
          <span>Trash</span>

          <span className="ml-auto rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
          {notes.filter(note => note.trashed).length}
          </span>
        </button>

        <button
          type="button"
          className="
            flex w-full items-center gap-3
            rounded-xl px-3 py-2.5
            text-sm text-gray-300
            transition
            hover:bg-gray-800
            hover:text-white
          "
        >
          <RiSettingsLine size={19} />
          Settings
        </button>

        {/* User */}
        <div className="mt-3 flex items-center gap-3 border-t border-gray-800 px-2 pt-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient from-cyan-500 to-blue-600 text-xs font-bold">
            JD
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              John Doe
            </p>

            <p className="truncate text-xs text-gray-500">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;