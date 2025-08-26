import { useParams, useRouter } from "@tanstack/react-router"
import { useState } from "react";
import useNoteStore from "../store/noteStore";
import { Plus, TagIcon } from "lucide-react";

const NoteEditPage = () => {
  const {notes,tags,addNote,updateNote,addTag} = useNoteStore();
  const {noteId} = useParams({strict:false})
  const note = noteId?notes[noteId]:null
  const tagsAsArray = Object.values(tags);
  const [title,setTitle]=useState(note?.title||'');
  const [content,setContent]=useState(note?.content||'');
  const [newTagName,setNewTagName] = useState('');
  const [selectedTags,setSelectedTags] = useState<string[]>(note?.tagIds||[])
  const router = useRouter()
  const createNote = (e:React.FormEvent)=>{
    e.preventDefault();
    if(title.trim()&&content.trim()){
      if(note){
        updateNote(note.id,{title,content,tagIds:selectedTags});
        router.navigate({to:`/notes/${note.id}`})
      }else{
        const newNoteId = addNote(title,content,selectedTags);
        // the addNote function return noteId 
        // after adding new note navigate to this note
        router.navigate({to:`/notes/${newNoteId}`})
      }
    }
  }
  const toggleTag = (tagId:string)=>{
    setSelectedTags((prev)=>(
      prev.includes(tagId)?prev.filter((id)=>id!==tagId):[...prev,tagId]
    ))
  }
  const handleTag = (e:React.FormEvent)=>{
    e.preventDefault();
    if(newTagName){
      const tagId = addTag(newTagName.trim());
      setNewTagName("");
      setSelectedTags((prev)=>[...prev,tagId])
    }
  }
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold">{note?'Edit Note':'Create New Node'}</h1>
      <form onSubmit={createNote} className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-y-4">
            <label htmlFor="title" className="text-xl font-bold">Title</label>
            <input type="text" id="title" value={title} required onChange={(e)=>setTitle(e.target.value)} className="bg-[#322F3D] px-4 py-2 outline-none text-lg rounded-sm focus:bg-[#87556F]"/>
          </div>
          <div className="flex flex-col gap-y-4">
            <label  className="text-xl font-bold" htmlFor="content">Content</label>
            <textarea id="content" value={content} required onChange={(e)=>setContent(e.target.value)} className="bg-[#322F3D] px-4 py-2 h-48 outline-none text-lg rounded-sm focus:bg-[#87556F]"/>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <label htmlFor="tags">Tags</label>
          <div className="flex flex-wrap gap-2">
            {
              Object.values(tags).length>0?
              Object.values(tags).map((tag)=>(
                <button type="button" key={tag.id} onClick={()=>toggleTag(tag.id)} className={`bg-[#322F3D] rounded-sm px-4 py-2 flex items-center gap-2 self-start ${selectedTags.includes(tag.id) ? "bg-[#87556F]" : "bg-[#322F3D]"}`}>
                  <TagIcon className="size-3"/>
                  {tags[tag.id]?.name}
                </button>
              )):'No Tags Yet'
            }
          </div>
          <input id="newTag" type="text" onChange={(e)=>setNewTagName(e.target.value)} value={newTagName}className="bg-[#322F3D] rounded-sm px-4 py-2 outline-none text-lg focus:bg-[#87556F] w-56"/>
          <button className="bg-[#322F3D] rounded-sm px-4 py-2 flex items-center gap-2 self-start" onClick={handleTag}>
            <Plus className="size-4"/>
            Add Tag
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 *:rounded-sm *:px-4 *:py-2">
          <button type="button" onClick={()=>router.navigate({to:'../../'})} className="bg-[#322F3D]" >Cancel</button>
          <button type="submit"  className="bg-[#87556F]">{note?'Edit Note':'Create New Note'}</button>
        </div>
      </form>
    </section>
  )
}

export default NoteEditPage