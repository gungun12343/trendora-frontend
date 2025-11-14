import { useState } from "react"
import { useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {useDispatch} from "react-redux";
import {addToCart} from "../utils/cartSlice";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faXmark, faBars} from "@fortawesome/free-solid-svg-icons"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

export const ShopAll = () => {
    const [products, setProducts] = useState(null);
    const [showMsg, setShowMsg] = useState(false);
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const section = searchParams.get("section") || "All";
    const category = searchParams.get("category") || "All Products";

    useEffect(() => {
        axios.get("https://trendora-backend-1-we1g.onrender.com/products", {withCredentials: true}).then((res) => {
            let allProducts = res.data;

            if(section !== "All" && category !== "All Products") {
                allProducts = allProducts.filter((prod) => prod.category === section && prod.type === category);
            } else if(section !== "All") {
                allProducts = allProducts.filter((prod) => prod.category === section);
            }

            setProducts(allProducts);
        })
        .catch((err) => console.log(err))
    }, [category, section])

    const handleClick = () => {
        setShowMsg(true);
        setTimeout(() => {
            setShowMsg(false);
        }, 1000)
    }

    const handleAddToCart = (prod) => {
        dispatch(addToCart({
            _id: prod._id,
            name: prod.name,
            price: prod.price,
            image: prod.images[0],
            color: prod.colors[0],
            size: prod.sizes[0] || "",
            description: prod.description
        }))

        toast.success("Added to Cart", {
            position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
        })
    }

     useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);

    if(products === null) return;

    return (
        <div className="">

            <div className="flex">

                {show && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-80 z-[999] md:hidden"
                        onClick={() => setShow(false)}
                    ></div>
                )}

                <div className="md:w-[20%] w-[50%] md:sticky absolute z-[1000] md:z-30">
                    {/* SORT BY SIDEBAR */}
                    <button className={`md:hidden fixed ${show ? "top-2" : "top-20"} left-1 z-[1000] p-2 bg-violet-900 text-white rounded-lg`} onClick={() => setShow(!show)}>
                        <FontAwesomeIcon icon={show ? faXmark : faBars}  />
                    </button>

                    <div className={`bg-white w-[50%] md:w-[20%] fixed md:pt-[92px] h-screen overflow-y-auto top-0 border-2 transform transition-transform duration-300 border-gray-300 ${show ? "translate-x-0" : "-translate-x-full"} ${show ? "bg-white" : ""} md:translate-x-0`}>
                        <h2 className="border-b text-center border-b-gray-300 px-5 py-3 text-xl font-bold">Shop By Category</h2>

                        <div className="border-b border-b-gray-300">
                            <h3 className="px-5 text-lg font-semibold">Men's fashion</h3>
                            <ul className="">
                                <Link onClick={() => setShow(false)} to="/shop?section=Men&category=Shirts"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Shirts</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Men&category=T-shirts"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">T-shirts</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Men&category=Jeans"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Jeans</li></Link>
                            </ul>
                        </div>

                        <div className="border-b border-b-gray-300">
                            <h3 className="px-5 text-lg font-semibold">Women's fashion</h3>
                            <ul className="">
                                <Link onClick={() => setShow(false)} to="/shop?section=Women&category=Suits"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Suits</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Women&category=T-shirts"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">T-shirts</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Women&category=Jeans"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Jeans</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Women&category=Tops"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Tops</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Women&category=Kurtis"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Kurtis</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Women&category=One piece dresses"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">One piece dresses</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Women&category=Shirts"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Shirts</li></Link>
                                <Link onClick={() => setShow(false)} to={`/shop?section=Women&category=${encodeURIComponent("Plazzos & Pants")}`}><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Plazzos & Pants</li></Link>
                            </ul>
                        </div>

                        <div className="border-b border-b-gray-300">
                            <h3 className="px-5 text-lg font-semibold">Electronics</h3>
                            <ul className="">
                                <Link onClick={() => setShow(false)} to="/shop?section=Electronics&category=Mobile Phones"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Mobile phones</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Electronics&category=Tablets"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Tablets</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Electronics&category=SmartWatches"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">SmartWatches</li></Link>
                                <Link onClick={() => setShow(false)} to={`/shop?section=Electronics&category=${encodeURIComponent("Ear phones")}`}><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Ear phones</li></Link>
                            </ul>
                        </div>

                        <div className="border-b border-b-gray-300">
                            <h3 className="px-5 text-lg font-semibold">Home</h3>
                            <ul className="">
                                <Link onClick={() => setShow(false)} to="/shop?section=Home&category=Bedsheets"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Bedsheets</li></Link>
                                <Link onClick={() => setShow(false)} to={`/shop?section=Home&category=${encodeURIComponent("Diwan sets")}`}><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Diwan sets</li></Link>
                                <Link onClick={() => setShow(false)} to={`/shop?section=Home&category=${encodeURIComponent("Home decor")}`}><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Home decor</li></Link>
                                <Link onClick={() => setShow(false)} to="/shop?section=Home&category=Curtains"><li className="pl-10 hover:bg-gray-200 py-1 cursor-pointer">Curtains</li></Link>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MAIN SECTION */}

                <div className="md:w-[80%] w-full  md:pt-[92px] pt-16">
                    {/* <div className="flex justify-end">
                        {showMsg && <div className="text-center fixed mt-4 py-2 w-1/5 mr-2 rounded-md bg-green-800 text-green-200 font-medium text-lg">Added to Cart</div>}
                    </div> */}
                    

                    <h2 className="text-center md:text-3xl text-xl font-bold mt-10">{category.toUpperCase()}</h2>

                    <motion.div className="flex flex-wrap  gap-5 justify-center px-5 py-8" variants={containerVariants} initial="hidden" animate="visible">
                        <AnimatePresence>
                        {products.map((prod) => (
                            <div key={prod._id} className="border border-gray-500 bg-violet-50 shadow-xl shadow-gray-600">
                                <Link  to={`/shop/product/`+prod.name} state={{prod}}>
                                    <div  className=" cursor-pointer p-2 w-64 ">
                                        <img src={prod.images[0]} className="w-64 rounded-t-xl h-72" />
                                        <p className="text-lg font-semibold pl-3">{prod.name}</p>
                                        <p className="text-gray-700 pl-3">{prod.category}</p>
                                        <p className="font-semibold pl-3">₹ {prod.price}</p>
                                        
                                    </div>
                                </Link>
                                <button onClick={() => {handleAddToCart(prod); handleClick()}} className="bg-violet-900 px-2 py-1 mt-1 ml-3 mb-1 rounded-lg text-white font-semibold transition-colors duration-300 hover:bg-violet-600">Add to Cart</button>
                            </div>
                        ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}