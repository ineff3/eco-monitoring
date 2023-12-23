import SideBar from "./SideBar"


const NewsLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {

    return (
        <div className="  w-full flex">
            <div className="hidden lg:flex lg:fixed">
                <SideBar />
            </div>
            <div className=" w-full lg:ml-[320px]">
                <div className=" max-w-[1440px] mx-auto flex flex-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default NewsLayout


