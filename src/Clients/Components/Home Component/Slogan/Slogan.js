import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const Slogan = () => {

    useEffect(() => {
        AOS.init({
          duration: 1000, 
          easing: 'ease-out-back',
        });
      }, []);
      

    return(
        <div className=" bg-slate-50 flex flex-col w-full p-20 sm:p-10  sm:gap-5 gap-10 -mt-3 ">
            <div data-aos="fade-up" className="flex flex-col flex-wrap justify-center items-center gap-10">
                    <div className="flex flex-col justify-center items-center gap-3">
                        {/* <div data-aos="fade-right" className=" font-Poppins text-8xl lg:text-[75px] llg:text-[70px] llg2:text-[65px] llgg:text-[60px] ssm2:text-[55px] md2:text-[50px] mmd:text-[47px] vsm:text-[43px] uppercase font-extrabold text-Primary  text-center" dangerouslySetInnerHTML={{__html: quoteData.quote_text}}/>
                        <h1 className="text-4xl font-bold">{">>|"}</h1> */}
                        <div className=" flex vsm:flex-col gap-4 font-Poppins text-8xl lg:text-[75px] llg:text-[70px] llg2:text-[65px] llgg:text-[60px] ssm2:text-[55px] md2:text-[50px] mmd:text-[47px] vsm:text-[43px] vsm2:text-[32px]  uppercase font-extrabold text-center">
                            <h1>LET'S MAKE </h1>
                            <h1>YOUR DREAM</h1>
                        </div>
                        <div className="flex gap-4 font-Poppins text-8xl lg:text-[75px] llg:text-[70px] llg2:text-[65px] llgg:text-[60px] ssm2:text-[55px] md2:text-[50px] mmd:text-[47px] vsm:text-[43px] vsm2:text-[32px] uppercase font-extrabold text-center">
                                <h1>Our </h1>
                                <img data-aos="flip-left" data-aos-duration="3000"  className="h-[100px] lg:h-[80px] llg:h-[75px] llg2:h-[70px] llgg:h-[65px] ssm2:h-[60px] md2:h-[55px] mmd:h-[53px] vsm:h-[48px] vsm2:h-[36px] object-contain" src="https://res.cloudinary.com/dtlrrlpag/image/upload/v1701184511/Next%20Studio/Logo/Next-Logo_jpf8lw.png" alt="icon"/>
                                <h1>Project</h1>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Slogan