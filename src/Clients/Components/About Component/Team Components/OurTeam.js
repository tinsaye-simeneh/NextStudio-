import TeamSlider from "./TeamSlider";

const OurTeam = () => {
  
    return (
      <div className="w-full mb-5 p-10 tvs:p-0 sm:p-10">
        <div className="w-full">
            <h1 className="text-Secondary vsm2:text-2xl text-4xl uppercase font-bold text-center mb-16 sm:mb-5">Management Team</h1>
            <div className="px-32 tvs:px-10  tmd:px-16 tt:px-20 llg2:px-10 llgg:p-0 sm:p-5" >
                <TeamSlider/>
            </div>  
        </div>
      </div>
    );
}

export default OurTeam;