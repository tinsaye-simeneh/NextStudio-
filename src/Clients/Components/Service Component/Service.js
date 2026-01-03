import ListService from "./ListService"
import SideService from "./SideService"

const Service = () => {
    return(
        <div className="flex-col llg2:p-10 nsm:p-5 p-10 justify-center gap-5 ">
            <SideService/>
            <ListService/>
        </div>
    )
}

export default Service;