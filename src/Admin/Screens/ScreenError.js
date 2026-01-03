const ScreenError = () => {
    return(
        <div className="flex flex-col inset-0 items-center justify-center h-screen">
            <div className="w-1/2 h-[40v]">
                <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_8gdxpy48.json"  background="transparent"  speed="1"  loop autoplay></lottie-player>
            </div>
            <div className="flex flex-col gap-2 w-[400px] vsmm:w-[320px] text-center">
                <h1 className="text-lg font-semibold vsmm:text-sm uppercase">This Screen Size is Not Supported Yet.</h1>
                <h1 className="text-md vsmm:text-xs ">Please switch to your Desktop and Laptop to use the Bimer Admin Panel.</h1>
            </div>
        </div>
    )
}

export default ScreenError;