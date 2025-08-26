import { createFileRoute } from '@tanstack/react-router'
import NoteEditPage from '../../../pages/NoteEditPage'

export const Route = createFileRoute('/notes/$noteId/edit')({
  component: NoteEditPage,
})

