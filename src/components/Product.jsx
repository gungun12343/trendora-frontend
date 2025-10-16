import { useState } from "react";
import {useLocation, useNavigate, useSearchParams, Navigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faAnglesRight} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from "../utils/cartSlice";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { BuyNow } from "./BuyNow";

export const Product = () => {
    const location = useLocation();
    const {prod} = location.state;
    const [color, setColor] = useState(prod.colors[0]);
    const [size, setSize] = useState(prod.sizes[0]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loggedIn} = useSelector((state) => state.auth);

    const details = prod.about.split('=>');

    const handleAddToCart = (prod) => {
        dispatch(addToCart({
            _id: prod._id,
            name: prod.name,
            price: prod.price,
            image: prod.images[0],
            color: color,
            size: size,
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

    const handleBuyNow = () => {
        if(!loggedIn) {
            //navigate("/login", {state: {from: location}, replace: true});
            navigate("/login")
        } else {
            const newProd = {
                _id: prod._id,
                name: prod.name,
                description: prod.description,
                price: prod.price,
                color: color,
                size: size,
                image: prod.images[0]
            }
            navigate("/buynow", {state: newProd});
        }
    }

    return (
        <div className="md:pt-28 pt-20 mx-5 mb-8 flex flex-col items-center">

            
            <div className="flex flex-col items-center mt-5">
                <div className="w-fit border p-3 rounded-md">
                    <h2 className="mb-2 text-lg text-gray-500 font-semibold">{prod.description}</h2>
                    <h3 className="text-xl font-bold">₹ {prod.price}</h3>
                </div>
            </div>

            <div className="mt-5 flex gap-3 lg:flex-row flex-col">
                {prod.images.map((image) => (
                    <img key={image} className="w-72 border" src={image} />
                ))}
            </div>
                
            <div className="mt-8 flex flex-wrap gap-8">
                <div className="border p-4 rounded-md">
                    <h3 className="font-semibold mb-3">SELECT COLOR</h3>    
                    <div className="flex gap-2">
                        {prod.colors.map((col) => (
                            <div key={col} onClick={() => setColor(col)} className={`border border-black px-2 py-1 rounded-3xl cursor-pointer font-medium ${color === col ? "bg-violet-200" : ""}`}>{col}</div>
                        ))}
                    </div>
                </div>
                
                {size && 
                <div className="border p-4 rounded-md">
                    <h3 className="font-semibold mb-3">SELECT SIZE</h3>    
                    <div className="flex gap-2">
                        {prod.sizes.map((s) => (
                            <div key={s} onClick={() => setSize(s)} className={`border border-black px-2 py-1 rounded-3xl cursor-pointer font-medium ${size === s ? "bg-violet-200" : ""}`}>{s}</div>
                        ))}
                    </div>
                </div>}
            </div>
            

            <div className="md:w-2/3 w-full mt-8 border rounded-md p-5">
                <h3 className="font-semibold mb-3">PRODUCT DETAILS</h3>
                <ul className="list-disc pl-6">
                    <li><p>Name: {prod.name}</p></li>
                    <li><p>Brand: {prod.brand}</p></li>
                    <li><p>Price: ₹ {prod.price}</p></li>
                    {details.map((det) => (
                        det !== '' && <li key={det}><p>{det}</p></li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-3 mt-8">
                <button onClick={() => {handleAddToCart(prod)}} className="border rounded-md px-6 py-2 border-violet-900 text-violet-900">
                    <FontAwesomeIcon icon={faCartShopping} className="text-violet-900 pr-2" />
                    <span className="font-semibold">Add to Cart</span>
                </button>

                <button onClick={handleBuyNow} className="border rounded-md px-6 py-2 bg-violet-900 text-white">
                    <FontAwesomeIcon icon={faAnglesRight} className="pr-2" />
                    <span className="font-semibold">Buy Now</span>
                </button>
            </div>
        </div>
    )
}