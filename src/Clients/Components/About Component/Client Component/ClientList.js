import { useSelector } from "react-redux"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const ClientList = () => {

    useEffect(() => {
        AOS.init({
          duration: 1000, 
          easing: 'ease-out-back',
        });
      }, []);

    const { clientData } = useSelector((state) => state.root)

    return(
        <div className=" bg-white flex flex-col justify-center items-center mb-10 vsmm:mt-0 w-full sm:gap-5 gap-14 ">
            {/* <div data-aos="fade-up" className=" flex flex-col justify-center items-center gap-3" >
                <h1 className="text-6xl sm:text-4xl text-Secondary font-extrabold uppercase ">Our</h1>
                <h1 className="text-6xl sm:text-4xl text-Secondary font-extrabold uppercase ">Partners</h1>
            </div> */}
            <div data-aos="fade-up" className="flex flex-wrap w-5/6 vvsm:w-full vsmm:w-full vsm:w-full lg:w-full md:w-full smm:w-full llg:w-full sm:w-full justify-center items-center gap-10">
                {clientData.map(client => (
                    <img className=" w-[250px] csm:w-[50px] vsmm:w-[65px] vvsm:w-[85px] cvs2:w-[90px] vsm:w-[110px] sm:w-[140px] md:w-[160px] smm:w-[180px] llg:w-[200px] grayscale hover:grayscale-0 hover:scale-125 " src={client.client_image.url} alt="Clients" />
                ))}
            </div>
        </div>
    )
}

export default ClientList;