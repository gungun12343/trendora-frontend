import { Link } from "react-router-dom"

export const AllSections = () => {
    return (
        <div>
            <h2 className="md:text-4xl text-2xl mt-16 text-center font-semibold">SHOP BY CATEGORY</h2>

            <div className="flex md:flex-nowrap flex-wrap justify-evenly mt-10">
                <Link to={"/shop?section=Men"}>
                    <div className="border-2 bg-blue-800 p-3 text-white text-center hover:opacity-80 cursor-pointer">
                        <img src="https://m.media-amazon.com/images/I/61DGAlvxRLL._SY550_.jpg" className="w-52 h-60" />
                        <p className="text-lg font-bold">MEN'S WEAR</p>
                        <p>SHOP NOW</p>
                    </div>
                </Link>

                <Link to={"/shop?section=Women"}>
                    <div className="border-2 bg-blue-800 p-3 text-white text-center hover:opacity-80 cursor-pointer">
                        <img src="https://m.media-amazon.com/images/I/71BtPTD7NPL._SY550_.jpg" className="w-52 h-60" />
                        <p className="text-lg font-bold">WOMEN'S WEAR</p>
                        <p>SHOP NOW</p>
                    </div>
                </Link>

                <Link to={"/shop?section=Electronics"}>
                    <div className="border-2 bg-blue-800 p-3 text-white text-center hover:opacity-80 cursor-pointer">
                        <img src="https://m.media-amazon.com/images/I/712SuRmHG4L._SX466_.jpg"  className="w-52 h-60"/>
                        <p className="text-lg font-bold">ELECTRONICS</p>
                        <p>SHOP NOW</p>
                    </div>
                </Link>

                <Link to={"/shop?section=Home"}>
                    <div className="border-2 bg-blue-800 p-3 text-white text-center hover:opacity-80 cursor-pointer">
                        <img src="https://m.media-amazon.com/images/I/81tcMzm91VL._SX425_.jpg" className="w-52 h-60" />
                        <p className="text-lg font-bold">HOME AESTHETICS</p>
                        <p>SHOP NOW</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}