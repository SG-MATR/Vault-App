import { createFileRoute } from "@tanstack/react-router";
import TagsPage from "../pages/TagsPage";

export const Route = createFileRoute('/tags')(
    {
        component:TagsPage,
        context:()=>({title:'Tags Page'})
    }
)
