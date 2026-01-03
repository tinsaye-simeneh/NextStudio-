import { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {

    useEffect(() => {
        document.title = "Page Not Found - Next Studio"
        window.scrollTo(0, 0);
    },[])

    return(
        <div className="bg-black h-[100vh] flex flex-col justify-center items-center gap-5">
            <div className = "h-[50vh]">
                <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_q2pevjuc.json"  background="transparent"  speed="1"  loop autoplay></lottie-player>
            </div>
            <h1 className="text-2xl text-white font-semibold">Page Not Found</h1>
            <h1 className="text-xl text-white">The page you`re looking for does not seem to exist</h1>
            <Link to='/'><button className="bg-Primary text-white rounded py-2 px-5 w-[150px]">Go to Home</button> </Link>
            
        </div>
    )
}

export default PageNotFound;