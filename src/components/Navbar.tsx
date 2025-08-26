import { Link } from "@tanstack/react-router"
import { BookText, FileText, TagIcon } from "lucide-react"

const Navbar = () => {
  return (
    <header className="bg-[#322F3D] px-8 py-6 grid grid-cols-1 justify-items-center gap-8 sm:justify-items-start sm:grid-cols-[min-content_1fr] sm:gap-x-12 ">
      <Link to="/" className="text-xl">Vault Notes</Link>
      <nav className="md:justify-self-end">
        <ul className="flex gap-6 flex-wrap items-center justify-between sm:flex-nowrap">
          <li>
            <Link className="flex items-center rounded-sm text-xl sm:px-4 sm:py-2 gap-x-2" to='/' activeProps={()=>({
              className:"text-white bg-[#4B5D67] px-4 py-2"
            })} 
            inactiveProps={()=>({
              className:"text-gray-400"
            })}
            >
              <BookText className="size-5"/>
              Vault
              </Link>
          </li>
          <li>
            <Link  className="flex items-center rounded-sm text-xl sm:px-4 sm:py-2 gap-x-2" to='/notes' activeProps={()=>({
              className:"text-white bg-[#4B5D67] px-4 py-2"
            })} 
            inactiveProps={()=>({
              className:"text-gray-400"
            })}>
              <FileText className="size-5"/>
              Notes</Link>
          </li>
          <li>
            <Link className="flex items-center rounded-sm text-xl sm:px-4 sm:py-2 gap-x-2" to='/tags' activeProps={()=>({
              className:"text-white bg-[#4B5D67] px-4 py-2"
            })} 
            inactiveProps={()=>({
              className:"text-gray-400"
            })}>
              <TagIcon className="size-5"/>
              Tags</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar