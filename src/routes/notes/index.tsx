import { createFileRoute } from "@tanstack/react-router";
import NotesListPage from "../../pages/NotesListPage";


export const Route = createFileRoute('/notes/')(
    {
        component:NotesListPage,
        context:()=>({title:'NotesPage App'})
    }
)