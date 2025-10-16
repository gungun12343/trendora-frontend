export const Footer = () => {
    return (
        <div className="bg-black text-white text-center p-5">
            <div>
                <div className="flex items-center justify-center">
                    {/* <img src="./favicon1.svg" className="w-12" />
                    <span className="font-bold text-xl">Trendora</span> */}
                    <img src="/logo.svg" className="w-60" />
                </div>
                <p className="">Your Style, Your Trend</p>
            </div>
            
            <div className="mt-2">
                <p className="text-gray-300">© 2025 Trendora. All rights reserved.</p>
            </div>
        </div>
    )
}