import { useSelector } from "react-redux";

const PortfolioContent1 = ({id}) => {

    const { portfolioData } = useSelector((state) => state.root)

    return(
        <div>
            {portfolioData.filter(portfolio => portfolio._id === id).map(portfolio => (
                
                <div className="flex flex-col ">
                    <div className="text-xl s3m:text-lg " dangerouslySetInnerHTML={{__html: portfolio.project_description1}}/>
                    <h1 className="text-xl s3m:text-lg mt-10 " ><strong>Date:- </strong>{portfolio.project_date}</h1>
                    <h1 className="text-xl s3m:text-lg mt-5 " ><strong>Client:- </strong>{portfolio.company_name}</h1>
                </div>
                    
            ))}
        </div>
    )
}

export default PortfolioContent1;