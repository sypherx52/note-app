import React from "react";

const TrashPage = ({ notes, onRestoreNote, onPermanentlyDeleteNote }) => {
  const trashedNotes = notes.filter((note) => note.trashed);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Trash
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Deleted notes are kept here.
            </p>
          </div>

          {trashedNotes.length > 0 && (
            <button
              type="button"
              className="
                rounded-lg
                px-4 py-2
                text-sm font-medium
                text-red-500
                transition
                hover:bg-red-50
              "
            >
              Empty Trash
            </button>
          )}
        </div>

        {/* Notes */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {trashedNotes.map((note) => (
            <article
              key={note.id}
              className={`
                rounded-2xl
                border border-black/5
                ${note.color}
                p-4
                shadow-sm
              `}
            >
              <h2 className="line-clamp-2 text-[15px] font-semibold text-gray-800">
                {note.title}
              </h2>

              <p className="mt-2 line-clamp-5 whitespace-pre-line text-sm leading-6 text-gray-600">
                {note.content}
              </p>

              <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                {note.date}
              </p>

              <div className="mt-4 flex gap-2 border-t border-black/5 pt-3">

                <button
                  onClick={() => onRestoreNote(note.id)}
                  type="button"
                  className="
                    rounded-lg
                    px-3 py-2
                    text-sm
                    text-gray-600
                    transition
                    hover:bg-gray-100
                  "
                >
                  Restore
                </button>

                <button
                  onClick={() => onPermanentlyDeleteNote(note.id)}
                  type="button"
                  className="
                    rounded-lg
                    px-3 py-2
                    text-sm
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                >
                  Delete permanently
                </button>

              </div>
            </article>
          ))}

        </div>

        {/* Empty state */}
        {trashedNotes.length === 0 && (
          <div className="flex min-h-64 items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-600">
                Trash is empty
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Deleted notes will appear here.
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default TrashPage;