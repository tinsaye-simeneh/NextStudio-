import { useSelector } from "react-redux";

const AboutContent = () => {

    const { aboutData } = useSelector((state) => state.root)

    return(
        <div className=" bg-white flex flex-col w-full p-20 sm:p-10 sm:gap-5 gap-10 -mt-5 ">
            <div data-aos="fade-up" className="flex flex-col justify-center items-center gap-3">
                <h1 className="text-6xl sm:text-4xl text-Secondary font-extrabold uppercase ">About</h1>
                <h1 className="text-6xl sm:text-4xl text-Primary font-extrabold uppercase">Next Studio</h1>
            </div>
            <div className="flex flex-col flex-wrap justify-center items-center gap-10">
                <div className="w-9/12 text-xl sm:text-sm sm:w-10/12 font-light text-center" dangerouslySetInnerHTML={{__html: aboutData.about_desc}}/>
            </div>
        </div>
    )
}

export default AboutContent;