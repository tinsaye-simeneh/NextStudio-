const TeamCard = ({img,name,title}) => {
    return(
        <div className="w-[250px] h-[400px] border-2 rounded mb-5">
            <div className="flex flex-col">
                <img className="h-[250px] w-full object-cover rounded mb-2" src={img} alt="team"/>
                <h1 className="font-semibold uppercase text-center text-xl">{name}</h1>
                <h1 className="text-lg text-center mb-5">{title}</h1>
            </div>
            <div className="flex gap-5 justify-center px-5 ">
                    <button className="bg-primary text-white w-[100px] py-2 px-5 rounded">Update</button>
                    <button className="bg-red-500 text-white w-[100px] py-2 px-5 rounded">Delete</button>
            </div>
        </div>
    )
}

export default TeamCard;