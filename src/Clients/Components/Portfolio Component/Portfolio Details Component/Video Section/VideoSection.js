import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { useSelector } from "react-redux";

const VideoSection = ({id}) => {

    const { portfolioData } = useSelector((state) => state.root)

    const [width,setWidth] = useState('')
    const [height,setHeight]= useState('')

    const setslide = () => {
        if(window.innerWidth <= 1920 && window.innerWidth > 1300){
            setWidth('640px')
            setHeight('360px')
        }
        else if(window.innerWidth <=1300 && window.innerWidth > 1145){
            setWidth('560px')
            setHeight('315px')
        }
        else if(window.innerWidth <=1145 && window.innerWidth > 980){
            setWidth('426px')
            setHeight('240px')
        }
        else if(window.innerWidth <= 980 && window.innerWidth > 699){
            setWidth('640px')
            setHeight('360px')
        }
        else if(window.innerWidth <= 699 && window.innerWidth > 500){
            setWidth('426px')
            setHeight('240px')
        }
        else if(window.innerWidth <= 500 ){
            setWidth('300px')
            setHeight('169px')
        }
    }  
        useEffect(() => {
            setslide()
            window.addEventListener('resize',() => {setslide()})
        },[])

    return(
        <div>
            {portfolioData.filter(portfolio => portfolio._id === id).map((data) => (
                <div>
                    {data.project_video === '' ? <div className=" hidden"></div> :  <ReactPlayer className="mb-10 sm:mb-5"  url={data.project_video} controls={true} width={width} height={height}/>}
                    
                </div>
            ))}

        </div>
    )
}

export default VideoSection;