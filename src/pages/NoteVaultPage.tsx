import { Link } from "@tanstack/react-router";
import { Plus, TagIcon } from "lucide-react";
import useNoteStore from "../store/noteStore";

export default function NoteVaultPage() {
  const { notes, tags } = useNoteStore();

  const allNotes = Object.values(notes).sort(
    (a, b) => b.updatedAt - a.updatedAt
  );

  return (
    <section className="flex flex-col gap-8">
       <div className="flex 410:justify-between 410:flex-row 410:items-center text-center gap-3 flex-col "> 
        <h1 className="font-bold text-4xl">Vault</h1>
         <Link
          to="/notes/new"
          className="bg-[#87556F] px-2 py-4 rounded-sm flex items-center justify-center 410px:gap-x-2 410px:px-6"
        >
          <Plus className="size-5" />
          New Note
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {allNotes.map((note) => (
          <div
            key={note.id}
            className="border border-[#322F3D] p-4 md:p-8 hover:bg-[#322F3D] transition-colors rounded-sm group"
          >
            <Link to={`/notes/${note.id}`} className="flex gap-4 flex-col">
              <h2 className="font-bold text-xl">{note.title}</h2>

              <p className="text-lg line-clamp-3">{note.content}</p>

              <div className="flex gap-2 flex-wrap">
                {note.tagIds.map((tagId) => (
                  <div
                    key={tagId}
                    className="self-start flex items-center gap-x-1 px-2 py-1 rounded-sm bg-[#87556F] group-hover:bg-[#4B5D67] transition-colors"
                  >
                    <TagIcon className="size-3" />
                    <span>{tags[tagId]?.name}</span>
                  </div>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {allNotes.length === 0 && (
        <p className="text-center text-lg">
          No notes found. Create one to get started!
        </p>
      )}
    </section>
  );
}