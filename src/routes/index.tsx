import { createFileRoute } from '@tanstack/react-router'
import NoteVaultPage from '../pages/NoteVaultPage'

export const Route = createFileRoute("/")(
    {
        component:NoteVaultPage,
        context:()=>(
            {
                title:'Vault App'
            }
        )
    }
)
