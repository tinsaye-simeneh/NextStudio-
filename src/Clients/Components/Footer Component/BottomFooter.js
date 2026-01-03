const BottomFooter = () => {
    const today = new Date();
    const year = today.getFullYear();
    return(
        <div className="flex flex-col w-full">
            <div className="bg-black h-[40px] flex justify-center items-center vsmm:w-full text-white text-sm sm:text-xs sm:h-[30px]">
                <h1>Copyright ©{year} Next Studio. All Rights Reserved.</h1>
            </div>
        </div>
    )
}

export default BottomFooter;