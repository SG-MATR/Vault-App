import { useState } from "react";
import useNoteStore from "../store/noteStore";
import { Edit2, Save, TagIcon, Trash2, X } from "lucide-react";

export default function TagsPage() {
  const { tags, addTag, updateTag, deleteTag } = useNoteStore();
  const [newTagName, setNewTagName] = useState("");
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editingTagName, setEditingTagName] = useState("");

  function handleAddTag(e: React.FormEvent) {
    e.preventDefault();

    addTag(newTagName.trim());
    setNewTagName("");
  }

  function startEditing(tagId: string, currentTagName: string) {
    setEditingTagId(tagId);
    setEditingTagName(currentTagName);
  }

  function handleUpdateTag(tagId: string) {
    if (editingTagName) {
      updateTag(tagId, editingTagName.trim());
      setEditingTagId(null);
      setEditingTagName("");
    }
  }

  function handleDeleteTag(tagId: string) {
    if (
      window.confirm(
        "Are you sure you want to delete this tag? It will be removed from all notes."
      )
    ) {
      deleteTag(tagId);
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">Manage Tags</h1>

      <form onSubmit={handleAddTag} className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <label htmlFor="tag" className="text-xl">
            Create a New Tag
          </label>
          <input
            type="text"
            id="tag"
            placeholder="New tag name"
            onChange={(e) => setNewTagName(e.target.value)}
            value={newTagName}
            className="border-l border-[#322F3D] p-2 text-xl outline-none md:border"
            required
          />
        </div>

        <button
          type="submit"
          className="text-xl bg-[#87556F] p-2 rounded-sm md:self-end md:px-4"
        >
          Add Tag
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Object.values(tags).map((tag) => (
          <div
            key={tag.id}
            className="bg-[#322F3D] rounded-sm p-6 flex flex-col gap-y-6 sm:flex-row sm:justify-between"
          >
            <div className="flex gap-4 items-center">
              <TagIcon className="size-5" />

              {editingTagId === tag.id ? (
                <input
                  type="text"
                  value={editingTagName}
                  onChange={(e) => setEditingTagName(e.target.value)}
                  className="bg-[#4B5D67] px-2 py-1 text-xl rounded-sm w-1/2 md:w-full outline-none"
                />
              ) : (
                <span className="text-xl font-bold">{tag.name}</span>
              )}
            </div>

            <div className="flex gap-6 items-center self-end">
              {editingTagId === tag.id ? (
                <>
                  <button onClick={() => handleUpdateTag(tag.id)}>
                    <Save className="size-5" />
                  </button>
                  <button onClick={() => setEditingTagId(null)}>
                    <X className="size-5" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(tag.id, tag.name)}>
                    <Edit2 className="size-5" />
                  </button>
                  <button onClick={() => handleDeleteTag(tag.id)}>
                    <Trash2 className="size-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {Object.values(tags).length === 0 && (
        <p className="text-center text-lg">
          No tags yet. Create one to get started!
        </p>
      )}
    </section>
  );
}