
import { NavLink} from "react-router-dom";
import User from "../Users/Users";


export default function Navbar() {

 
  return (
    <nav className="text-white sticky top-0 left-0 w-full z-50 bg-slate-900 h-16 flex items-center justify-between px-6">
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex items-center gap-7">
          <li>
            <NavLink to="/" >
              Home
            </NavLink>
            
          </li>
        </ul>
      </div>
      <div className="flex items-center">
     <User/>
     </div>
    </nav>
  );
};