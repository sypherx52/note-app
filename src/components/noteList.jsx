import React ,{useState}from "react";
import {
  RiCloseLine,
  RiStarLine,
  RiStarFill,
  RiPushpinLine,
  RiMore2Fill,
  RiCheckboxLine,
  RiPaletteLine,
  RiImageLine,
  RiArchiveLine,
  RiDeleteBinLine,
} from "@remixicon/react";

const NoteCard = ({
  note,
  onToggleFav,
  onTogglePin,
  onDeleteNote,
  onSelectedNote,
  onToggleArchived,
  onRestoreNote,
  onPermanentlyDeleteNote,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article
      onClick={() => {
        onSelectedNote(note.id);
      }}
      className={`
        group relative
        rounded-2xl
        border border-black/5
        ${note.color}
        p-4
        shadow-sm
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-lg
      `}
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-gray-800">
          {note.title}
        </h3>

        {/* Pin */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id);
          }}
          type="button"
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          className="
            rounded-full p-1.5
            transition
            hover:bg-black/5
            hover:text-gray-800
          "
        >
          <RiPushpinLine
            size={17}
            className={
              note.pinned ? "text-cyan-600" : "text-gray-500"
            }
          />
        </button>
      </div>

      {/* Content */}
      <p className="mt-2 line-clamp-5 whitespace-pre-line text-sm leading-6 text-gray-600">
        {note.content}
      </p>

      {/* Date */}
      <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {note.date}
      </p>

      {/* Actions */}
      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          border-t
          border-black/5
          pt-3
          opacity-70
          transition-opacity
          group-hover:opacity-100
        "
      >
        {/* Left actions */}
        <div className="flex items-center gap-1">

          {/* Favorite */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(note.id);
            }}
            type="button"
            aria-label="Favorite"
            className="
              rounded-full p-1.5
              text-gray-500
              transition
              hover:bg-black/5
              hover:text-yellow-500
            "
          >
            {note.favorite ? (
              <RiStarFill
                size={17}
                className="text-yellow-500"
              />
            ) : (
              <RiStarLine size={17} />
            )}
          </button>

          {/* More menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((previous) => !previous);
              }}
              type="button"
              aria-label="More options"
              className="
                rounded-full p-1.5
                text-gray-500
                transition
                hover:bg-black/5
                hover:text-gray-800
              "
            >
              <RiMore2Fill size={17} />
            </button>

            {/* Menu */}
            {showMenu && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="
                  absolute
                  bottom-10
                  left-0
                  z-50
                  w-40
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-1
                  shadow-lg
                "
              >

                {/* Restore */}
                {note.trashed && (
                  <button
                    onClick={() => {
                      onRestoreNote(note.id);
                      setShowMenu(false);
                    }}
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2
                      text-sm
                      text-gray-600
                      transition
                      hover:bg-gray-100
                      hover:text-gray-900
                    "
                  >
                    <RiArchiveLine size={17} />

                    <span>Restore</span>
                  </button>
                )}

                {/* Delete permanently */}
                {note.trashed && (
                  <button
                    onClick={() => {
                      onPermanentlyDeleteNote(note.id);
                      setShowMenu(false);
                    }}
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2
                      text-sm
                      text-red-500
                      transition
                      hover:bg-red-50
                      hover:text-red-600
                    "
                  >
                    <RiDeleteBinLine size={17} />

                    <span>Delete permanently</span>
                  </button>
                )}

                {/* Archive / Unarchive */}
                {!note.trashed && (
                  <button
                    onClick={() => {
                      onToggleArchived(note.id);
                      setShowMenu(false);
                    }}
                    type="button"
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2
                      text-sm
                      text-gray-600
                      transition
                      hover:bg-gray-100
                      hover:text-gray-900
                    "
                  >
                    <RiArchiveLine size={17} />

                    <span>
                      {note.archived
                        ? "Unarchive"
                        : "Archive"}
                    </span>
                  </button>
                )}

              </div>
            )}
          </div>
        </div>

        {/* Delete */}
        {!note.trashed && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
            type="button"
            aria-label="Delete note"
            className="
              rounded-full p-1.5
              text-gray-400
              transition
              hover:bg-black/5
              hover:text-red-500
            "
          >
            <RiCloseLine size={17} />
          </button>
        )}
      </div>
    </article>
  );
};

const Notelist = ( {notes ,onToggleFav ,onTogglePin ,onDeleteNote ,onSelectedNote,onNewNote,onToggleArchived ,onRestoreNote ,onPermanentlyDeleteNote}) => {
  const pinnedNotes = notes.filter((note)=>{
    return note.pinned===true;
  })
  const otherNotes = notes.filter((note)=>{return note.pinned===false;})
  
  
    

  const totalNotes = notes.length;

  return (
    <main className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Quick Add */}
        <div className="mx-auto mb-10 max-w-2xl">
          <div
            className="
              rounded-2xl
              border border-gray-200
              bg-white
              p-3
              shadow-sm
              transition
              hover:shadow-md
            "
          >
            <div className="flex items-center gap-3">
              <input onClick={onNewNote}
                type="text"
                placeholder="Take a note..."
                className="
                  min-w-0 flex-1
                  bg-transparent
                  px-2 py-2
                  text-sm text-gray-700
                  placeholder:text-gray-400
                  outline-none
                "
              />

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Checklist"
                  className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <RiCheckboxLine size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Change color"
                  className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <RiPaletteLine size={19} />
                </button>

                <button
                  type="button"
                  aria-label="Add image"
                  className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <RiImageLine size={19} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pinned */}
        {pinnedNotes.length > 0 && (
          <section className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Pinned
              </h2>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note} 
                  onToggleFav={onToggleFav}
                  onTogglePin={onTogglePin}
                  onDeleteNote={onDeleteNote}
                  onSelectedNote={onSelectedNote}
                  onToggleArchived={onToggleArchived}
                  onRestoreNote={onRestoreNote}
                  onPermanentlyDeleteNote={onPermanentlyDeleteNote}
                />
              ))}
            </div>
          </section>
        )}

        {/* Other Notes */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Other Notes
            </h2>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {otherNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onToggleFav={onToggleFav}
                onTogglePin={onTogglePin}
                onDeleteNote={onDeleteNote}
                onSelectedNote={onSelectedNote}
                onToggleArchived={onToggleArchived}
                onRestoreNote={onRestoreNote}
                onPermanentlyDeleteNote={onPermanentlyDeleteNote}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 border-t border-gray-200 py-5 text-center">
          <p className="text-xs text-gray-400">
            {totalNotes} notes
          </p>
        </div>
      </div>
    </main>
  );
};

export default Notelist;