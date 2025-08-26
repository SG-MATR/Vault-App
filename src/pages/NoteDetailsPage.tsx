import { Link, useParams, useRouter } from "@tanstack/react-router";
import useNoteStore from "../store/noteStore";
import { Edit, TagIcon, Trash2 } from "lucide-react";

export default function NoteDetailsPage() {
  const { noteId } = useParams({ strict: false });

  const { notes, tags, deleteNote } = useNoteStore();

  const router = useRouter();

  const note = noteId ? notes[noteId] : null;

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note!.id);
      router.navigate({ to: "/notes" });
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="grid grid-cols-[max-content] gap-4 sm:grid-cols-[1fr_min-content_min-content]">
        <h1 className="text-4xl font-bold">{note?.title}</h1>

        <Link
          to={`/notes/${note?.id}/edit`}
          className="flex items-center justify-center gap-x-2 p-4 bg-[#322F3D] rounded-sm"
        >
          <Edit className="size-5" /> Edit
        </Link>

        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-x-2 p-4 bg-[#87556F] rounded-sm"
        >
          <Trash2 className="size-5" />
          Delete
        </button>
      </div>

      {note?.tagIds.map((tagId) => (
        <div
          key={tagId}
          className="self-start flex items-center gap-x-2 px-4 py-2 rounded-sm bg-[#322F3D]"
        >
          <TagIcon className="size-3" />
          <span>{tags[tagId].name}</span>
        </div>
      ))}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.5fr] lg:items-center">
        <p className="text-lg">{note?.content}</p>

        <div className="space-y-2 bg-[#322F3D] p-4 justify-self-start lg:justify-self-auto md:text-center">
          <p>Created: {new Date(note!.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(note!.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
}