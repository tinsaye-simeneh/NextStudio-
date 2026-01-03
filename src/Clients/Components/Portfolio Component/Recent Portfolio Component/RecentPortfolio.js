import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RecentPortfolio = () => {

    const { portfolioLengthData } = useSelector((state) => state.root)

    return(
        <div className="flex flex-col justify-center mt-20 mb-10 items-center gap-10 sm:gap-5">
            <div className="flex flex-col justify-center gap-5 items-center mb-10">
            <div className="flex flex-wrap gap-1 justify-center items-center mb-10">
                {portfolioLengthData.slice(0,6).map((p) => (
                    <Link to={`/portfolios/${p._id}`}>
                        <div style={{backgroundImage: `url(${p.project_image[0].url})`, backgroundPosition: 'center', backgroundSize:'cover'}} className={`w-[400px] h-[300px] vsmm:w-[300px] vsmm:h-[200px]  text-xl text-transparent items-end font-semibold hover:text-white `}>
                            <div className=" flex items-end w-full h-full p-5 hover:bg-opacity-80 hover:bg-Primary uppercase">{p.project_name}</div>
                        </div>
                    </Link>
                ))}   
            </div>
                <Link to={'/portfolios'}><button className='border-Primary hover:bg-Primary hover:text-white border-2 text-Primary vsmm:w-[130px] vsmm:text-sm w-[150px] py-2 px-5 rounded-2xl'>More Works</button></Link>
            </div>
        </div>
    )
}

export default RecentPortfolio;