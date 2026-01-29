import { useRef, useState, useEffect } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

const PortfolioNavbar = () => {

    const navRef = useRef()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    // Disable body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    // Handle scroll to hide/show navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            
            if (currentScrollY < 10) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                setIsVisible(false)
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsVisible(true)
            }
            
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_bar")
        setIsMenuOpen(!isMenuOpen)
    }

    return(
        <header className={`fixed top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <Link to="/" className="w-[15vh] sm:w-[10vh]">
                <img src="https://res.cloudinary.com/dtlrrlpag/image/upload/v1671362225/Next%20Studio/Logo/Next_Studio_Logo_ygxexg.png" alt="Logo" className="cursor-pointer" />
            </Link>
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