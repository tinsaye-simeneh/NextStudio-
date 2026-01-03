const TeamCard = ({img,name,title}) => {
    return(
        <div className="w-[280px] vvsm:ml-[20%] vsm2:ml-[15%] msm:ml-[8%] llgg:w-[240px] border-2 hover:shadow-xl rounded mb-5">
            <div className="flex flex-col">
                <img className="w-[280px] llgg:w-[240px] object-contain rounded rounded-b-none mb-2" src={img} alt="team"/>
                <h1 className="font-semibold uppercase text-center text-md">{name}</h1>
                <h1 className="text-sm text-center mb-5">{title}</h1>
            </div>
        </div>
    )
}

export default TeamCard;