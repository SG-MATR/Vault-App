import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NotesStore } from "../types/index";

const useNoteStore = create<NotesStore>()(
  persist(
    (set) => ({
      notes: {},
      tags: {},

      addNote: (title, content, tagIds) => {
        const id = crypto.randomUUID();
        const timeStamp = Date.now();

        set((state) => ({
          notes: {
            ...state.notes,
            [id]: {
              id,
              title,
              content,
              tagIds,
              createdAt: timeStamp,
              updatedAt: timeStamp,
            },
          },
        }));

        return id;
      },

      updateNote: (noteId, updates) => {
        set((state) => ({
          notes: {
            ...state.notes,
            [noteId]: {
              ...state.notes[noteId],
              ...updates,
              updatedAt: Date.now(),
            },
          },
        }));
      },

      deleteNote: (noteId) => {
        set((state) => {
          const { [noteId]: _, ...remmainingNotes } = state.notes;
          return { notes: remmainingNotes };
        });
      },

      addTag: (name) => {
        const id = crypto.randomUUID();

        set((state) => ({
          tags: {
            ...state.tags,
            [id]: { id, name },
          },
        }));

        return id;
      },

      updateTag: (tagId, name) => {
        set((state) => ({
          tags: {
            ...state.tags,
            [tagId]: { ...state.tags[tagId], name },
          },
        }));
      },

      deleteTag: (tagId) => {
        set((state) => {
          const { [tagId]: _, ...remainingTags } = state.tags;

          const updatedNotes = Object.entries(state.notes).reduce(
            (acc, [noteId, note]) => ({
              ...acc,
              [noteId]: {
                ...note,
                tagIds: note.tagIds.filter((id) => id !== tagId),
              },
            }),
            {}
          );

          return {
            tags: remainingTags,
            notes: updatedNotes,
          };
        });
      },
    }),
    { name: "Notes-Vault" }
  )
);

export default useNoteStore;