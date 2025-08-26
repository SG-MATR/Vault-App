import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({component:Layout});


// this function represents all child routes in your app
function Layout(){
    const {matches} = useRouterState();
    const activeMatch = matches[matches.length-1] // [root,yourRoute]
    const {title="NoteVault App"} = activeMatch.context;
    useEffect(()=>{
        document.title = title
    },[title])
    return (
        <>
            <Navbar/>
            <main className="px-8 py-6">
                <Outlet/>
            </main>
        </>
    )
}