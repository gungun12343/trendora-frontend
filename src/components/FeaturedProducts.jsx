import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

export const FeaturedProduct = () => {
    //const [products, setProducts] = useState(null);
    const products = useSelector((state) => state.featured);
    //console.log(products);

    // useEffect(() => {
    //     axios.get("https://trendora-backend-1-we1g.onrender.com/products", {withCredentials: true}).then((res) => {
    //         const data = res.data.filter((prod) => prod.featured === true);
    //         setProducts(data);
    //     })
    // }, [])

    if(products === null) return <p>loading...</p>;

    return (
        <div>
            <h2 className="md:text-4xl text-2xl mt-10 text-center font-semibold">FEATURED PRODUCTS</h2>

            <div className="mt-10 flex gap-5 flex-wrap justify-center mb-5">
                
                {products.map((prod) => (
                    <Link to={"/shop/product/"+prod.name} key={prod._id} state={{prod}}>
                        <div className="border cursor-pointer p-2 w-64 border-gray-500 bg-gray-100 shadow-xl shadow-gray-600 transform transition duration-300 hover:-translate-y-2">
                            <img src={prod.images[0]} className="w-64 h-72" />
                            <p className="text-lg pt-1 font-semibold pl-3">{prod.name}</p>
                            {/* <p className="text-gray-700 pl-3">{prod.category}</p> */}
                            <p className="font-semibold pl-3">₹ {prod.price}</p>
                        </div>
                    </Link>
                ))}
    
            </div>
        </div>
    )
}