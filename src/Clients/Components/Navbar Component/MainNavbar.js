import { Link, useParams } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRef } from "react";

const MainNavbar = () => {
    const navRef = useRef()

    const { url } = useParams() 
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_bar")
        console.log(url)
    }
    return(
        <header className="absolute">
            <div className="w-[15vh] sm:w-[10vh]">
                <img src="https://res.cloudinary.com/dtlrrlpag/image/upload/v1671362225/Next%20Studio/Logo/Next_Studio_Logo_ygxexg.png" alt="Logo" />
            </div>
            <nav className="sm:flex sm:flex-col sm:text-xl sm:gap-20" ref={navRef}>   
                <Link to='/about'>About</Link>
                <Link to='/portfolios'>Works</Link>
                <Link to='/contact'>Contact</Link>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}> <FaTimes/></button>
            </nav>
            <button className="nav-btn show-btn" onClick={showNavbar}><FaBars/></button>
        </header>
    )
}

export default MainNavbar;