import { useEffect, useState } from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const Search = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q") || null;
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if(search) {
            axios.get(`https://trendora-backend-1-we1g.onrender.com/products/${search}`).then((res) => {
                setProducts(res.data);
                if(res.data.length === 0 && !toast.isActive("no-match")) {
                    toast.error("No matches found", {
                        toastId: "no-match",
                        position: "top-left",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        onClose: () => navigate("/")
                    })
                }
            })
            .catch((err) => console.log(err))
        }
       
    }, [search])

    if(products === null) return;

    return (
        <div className="mt-24">
            <h2 className="text-center text-xl font-semibold">Results</h2>

            <div className="mt-4 flex flex-wrap gap-5 justify-center">
                {
                    products.map((prod) => (
                        <Link to={`/shop/product/`+prod.name} key={prod._id} state={{prod}}>
                            <div  className="border cursor-pointer p-2 w-64 border-gray-500 bg-violet-50 shadow-xl shadow-gray-600">
                                <img src={prod.images[0]} className="w-64 rounded-t-xl h-72" />
                                <p className="text-lg font-semibold pl-3">{prod.name}</p>
                                <p className="text-gray-700 pl-3">{prod.category}</p>
                                <p className="font-semibold pl-3">₹ {prod.price}</p>
                                <button className="bg-violet-900 px-2 py-1 mt-1 ml-3 rounded-lg text-white font-semibold transition-colors duration-300 hover:bg-violet-600">Add to Cart</button>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}