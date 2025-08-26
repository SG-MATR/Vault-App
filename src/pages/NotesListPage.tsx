import { Link } from "@tanstack/react-router";
import {  Plus, TagIcon } from "lucide-react";
import useNoteStore from "../store/noteStore";
import {  useState } from "react";

const NotesListPage = () => {
  const {notes,tags} = useNoteStore();
  const [tagId,setTagId] = useState<string|null>(null)
  const filteredNotes = Object.values(notes).filter(note=>!tagId||note.tagIds.includes(tagId)).sort((a,b)=>b.updatedAt-a.updatedAt)
  console.log(filteredNotes)
  return (
    <section className="flex flex-col gap-8">
      {/* h1 and Link Button  */}
      <div className="flex 410:justify-between 410:flex-row 410:items-center text-center gap-3 flex-col "> 
        <h1 className="font-bold text-4xl">All Notes</h1>
         <Link
          to="/notes/new"
          className="bg-[#87556F] px-2 py-4 rounded-sm flex items-center justify-center 410px:gap-x-2 410px:px-6"
        >
          <Plus className="size-5" />
          New Note
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap">
        <button className={`px-4 py-2 rounded-sm text-lg ${tagId===null?'bg-[#87556F]':'bg-[#322F3D]'}`} onClick={()=>setTagId(null)}>All</button>
        {
          Object.values(tags).map((tag)=>(
            <button
              key={tag.id}
              onClick={()=>setTagId(tag.id)}
              className={`px-4 py-2 rounded-sm text-lg flex items-center gap-x-2 ${tagId===tag.id?'bg-[#87556F]':'bg-[#322F3D]'}`}
            >
              <TagIcon className="size-3" />
              {tag?.name}
            </button>
          ))
        }
      </div>
      <div>
        {
         filteredNotes.map((note)=>(
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
         ))
        }        
      </div>
      {filteredNotes.length===0&&(<p className="text-center text-lg">No Notes Found. Create One To Get Started</p>)}
    </section>
  )
}

export default NotesListPage