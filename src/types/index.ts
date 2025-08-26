export interface Note{
    id:string,
    title:string,
    content:string,
    tagIds:string[],
    createdAt:number,
    updatedAt:number
}

interface Tag{
    id:string,
    name:string
}

export interface NotesStore{
    notes:Record<string,Note>,
    tags:Record<string,Tag>,
    addNote:(title:string,content:string,tagIds:string[])=>string,
    updateNote:(noteId:string,updates:Partial<Omit<Note,"id">>)=>void,
    addTag:(tagName:string)=>string,
    deleteNote:(noteId:string)=>void,
    updateTag: (tagId: string, name: string) => void,
    deleteTag: (tagID: string) => void;
}