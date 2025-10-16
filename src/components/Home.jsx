import { AllSections } from "./AllSections"
import { BestSellers } from "./BestSellers"
import { FeaturedProduct } from "./FeaturedProducts"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="min-h-screen">

            <div className="relative w-full min-h-[80vh] mt-24 overflow-hidden">
                {/* Background image */}
                <img
                    className="absolute inset-0 w-full h-full object-cover overflow-hidden brightness-[0.6]"
                    src="https://static.wixstatic.com/media/ea71bb_f6afb11f2c8f406ca1c8993c2eca99e7~mv2_d_11495_6131_s_4_2.jpg/v1/fill/w_1428,h_839,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ea71bb_f6afb11f2c8f406ca1c8993c2eca99e7~mv2_d_11495_6131_s_4_2.jpg"
                    alt="Hero background"
                />

                {/* Foreground content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-white min-h-[80vh] px-5 text-center">
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                    Unbox Happiness.
                    </p>
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                    Shop Smart.
                    </p>

                    <p className="text-base sm:text-lg md:text-xl max-w-md sm:max-w-xl my-5">
                    Experience seamless shopping with our curated collection of premium products.
                    </p>

                    <Link
                    to="/shop"
                    className="text-base sm:text-lg border-2 border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-linear"
                    >
                    Shop the collection
                    </Link>
                </div>
            </div>


            <AllSections />
            <FeaturedProduct />
            {/* <BestSellers /> */}
        </div>
    )
}