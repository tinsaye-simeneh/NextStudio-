/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import TeamCard from "./TeamCard";

const TeamSlider =  () =>  {

    const [progress,setProgress] = useState(0)
    const [slidetoshow,setslidetoshow] = useState(4)
    const { teamData } = useSelector((state) => state.root)
    
    const setslide = () => {
        if(window.innerWidth <= 1250 && window.innerWidth > 1000){
            setslidetoshow(3)
        }
        else if(window.innerWidth <=1000 && window.innerWidth > 650){
            setslidetoshow(2)
        }
        else if(window.innerWidth <= 650){
            setslidetoshow(1)
        }
    }   
        useEffect(() => {
            setslide()
            setProgress(100/(teamData.length - slidetoshow + 1))
            window.addEventListener('resize',() => {setslide()})
        },[])

        const settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
          responsive: [
            {
              breakpoint: 1290,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 568,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        };
    return(
        <div className="team relative">
            <Slider {...settings}>
                {teamData.map((data,index) => (
                    <div key={index}>
                        <TeamCard name={data.full_name} title={data.work_title} img={data.team_image.url}/>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default TeamSlider;