import { useRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

const PortfolioNavbar = () => {

    const navRef = useRef()
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_bar")
    }

    return(
        <header className="absolute">
            <div className="w-[15vh] sm:w-[10vh]">
                <img src="https://res.cloudinary.com/dtlrrlpag/image/upload/v1671362225/Next%20Studio/Logo/Next_Studio_Logo_ygxexg.png" alt="Logo" />
            </div>
            <nav className="sm:flex sm:flex-col sm:text-xl sm:gap-20" ref={navRef}>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}> <FaTimes/></button>
            </nav>
            <button className="nav-btn show-btn" onClick={showNavbar}><FaBars/></button>
        </header>
    )
}

export default PortfolioNavbar