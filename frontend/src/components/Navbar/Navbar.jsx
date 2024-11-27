import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav className='w-screen px-5 py-2 flex justify-between items-center'>
            <div className="text-xl font-semibold">Logo</div>
            <div className="flex justify-center items-center gap-3">
                <NavLink to="/login" rel="noopener noreferrer">
                    <div className="text-sm font-medium text-black/60 hover:scale-105 cursor-pointer px-5 py-2 text-center hover:bg-blue-500 hover:text-white transition-transform duration-300 ease-in-out rounded-sm">Login</div>
                </NavLink>
                <NavLink to="/signup" rel="noopener noreferrer">
                    <div className="text-sm font-medium text-white hover:scale-[102%] px-5 py-2 text-center bg-purple-700 cursor-pointer transition-transform duration-300 ease-in-out rounded-sm">Register</div>
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
