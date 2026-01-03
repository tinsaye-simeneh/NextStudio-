import { useParams } from "react-router-dom";
import PortfolioNavbar from "../Components/Navbar Component/PortfolioNavbar";
import PortfolioIntro from "../Components/Portfolio Component/Portfolio Details Component/PortfolioIntro";
import PortfolioContent1 from "../Components/Portfolio Component/Portfolio Details Component/PortfolioContent1";
import Footer from "../Components/Footer Component/Footer";
import GallerySlider from "../Components/Portfolio Component/Portfolio Details Component/Portfolio Gallery/GallerySlider";
import VideoSection from "../Components/Portfolio Component/Portfolio Details Component/Video Section/VideoSection";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

const PortfolioDetailsPage = () => {

    const {id} = useParams()

    const { portfolioData, portfolioLengthData, contactData } = useSelector((state) => state.root)

    useEffect(() => {
        
        if (portfolioData) {
            const selectedPortfolio = portfolioData.find(portfolio => portfolio._id === id);
    
            if (selectedPortfolio) {
                document.title = `${selectedPortfolio.project_name} - Next Studio`;
            }
        }
    
        window.scrollTo(0, 0);
    }, [id, portfolioData]);
    
    return (
        <div>
            {portfolioData && portfolioLengthData && contactData && (
                <div>
                    <PortfolioNavbar/>
                    <PortfolioIntro id={id}/>
                    <div className="w-full px-10 py-5 s3m:flex-col justify-center pds:gap-5 flex s3m:gap-5 mx-auto gap-10"> 
                        <div className="s3m:w-full w-1/2">
                            <PortfolioContent1 id={id}/>
                        </div>
                        <div className="s3m:w-full s3m:items-center flex flex-col w-1/2">
                            <VideoSection id={id}/>
                            <div className="w-full s3m:w-[700px] vsm:w-[480px] pds3:w-[300px] pds3:px-0 s3m:px-7 ">
                                 <GallerySlider id={id}/>
                            </div>
                        </div>
                    </div>
                
                    <ScrollToTop smooth top="20" color="white" style={{
                        backgroundColor: "#EF5B2C",
                        width: "40px",
                        height: "40px",
                        borderRadius: "100%",
                        alignItems: "center"
                     }}
                         viewBox="5 3 10 30"
                         svgPath="M24,21a1,1,0,0,1-.71-.29L16,13.41l-7.29,7.3a1,1,0,1,1-1.42-1.42l8-8a1,1,0,0,1,1.42,0l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,24,21Z"
                    />
                    <Footer/>
                </div>
            )}
        </div>
    )
}

export default PortfolioDetailsPage;