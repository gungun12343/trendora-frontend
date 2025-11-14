import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser, faMagnifyingGlass, faCartShopping, faAllergies} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import {logout} from "../utils/authSlice"
import { clearCart } from "../utils/cartSlice";
import {setCart} from "../utils/cartSlice"

export const Header = () => {
    const [selected, setSelected] = useState(false);
    const [search, setSearch] = useState("");
    const {loggedIn, user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {items} = useSelector((state) => state.cart);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const fetchCart =  () => {
    axios.get("https://trendora-backend-1-we1g.onrender.com/cart", {withCredentials: true}).then((res) => {
      const dbCart = res.data.items || [];
      dispatch(setCart({items: dbCart, isLoggedIn: true}));
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    if(loggedIn) {
      fetchCart();
    }
  }, [loggedIn])

    useEffect(() => {
        setSearch("");
    }, [])

    const handleLogout = () => {
        axios.post("https://trendora-backend-1-we1g.onrender.com/cart", {items}, {withCredentials: true}).then((res) => {
            axios.get("https://trendora-backend-1-we1g.onrender.com/logout", {withCredentials: true}).then((res) => {
                dispatch(logout());
                dispatch(clearCart());
                navigate("/");
            })
            .catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }

    const handleSearch = () => {
        navigate(`/search?q=${encodeURIComponent(search)}`)
        setSearch("");
    }

    return (
        <div className=" border-b border-b-gray-300 fixed top-0 left-0 z-50 bg-white w-full">
            <div className="flex items-center justify-between border-b border-b-gray-300 md:px-5">
                <div className="flex">
                    <img src="/logo.svg" className="h-12 w-auto md:h-14 min-w-[150px]" />
                </div>

                <div className="flex items-center md:gap-3 gap-1">
                    <div className="border-2 border-black rounded-3xl flex items-center justify-between max-w-[280px] min-w-[120px]">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Trendora" className="outline-none relative w-[80%] px-1 md:px-2 py-1 md:text-[18px] text-[14px] rounded-3xl" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-1 text-end cursor-pointer w-[10%]" onClick={handleSearch} />
                    </div>
                    
                    <div className="flex items-center md:ml-4">
                        <FontAwesomeIcon icon={faUser} className="md:text-[16px] text-[13px]" />
                        {  loggedIn ?
                            <p onClick={handleLogout} className="cursor-pointer md:text-[16px] text-[13px]" >LogOut</p> : 
                            <Link to={"/login"}><p>Login</p></Link>
                        }
                    </div>
                    
                    <Link to={"/cart"}>
                        <div className="flex pr-1">
                            <p className="md:text-[16px] text-[13px]"><FontAwesomeIcon icon={faCartShopping} /></p>
                            <span className="md:text-[16px] text-[13px]">{totalItems}</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex justify-center gap-4 py-1">
                <Link to={"/"} className={`md:text-[18px] text-[14px] hover:text-violet-950 font-semibold text-gray-500 ${selected ? "text-violet-950" : ""}`}>Home</Link>
                <Link to={"/shop"} className={`md:text-[18px] text-[14px] hover:text-violet-950 font-semibold text-gray-500 ${selected ? "text-violet-950" : ""}`}>Shop</Link>
                <Link to={"/about"} className={`md:text-[18px] text-[14px] hover:text-violet-950 font-semibold text-gray-500 ${selected ? "text-violet-950" : ""}`}>About</Link>
                <Link to={"/contact"} className={`md:text-[18px] text-[14px] hover:text-violet-950 font-semibold text-gray-500 ${selected ? "text-violet-950" : ""}`}>Contact</Link>
                <Link to={"/order"} className={`md:text-[18px] text-[14px] hover:text-violet-950 font-semibold text-gray-500 ${selected ? "text-violet-950" : ""}`}>Orders</Link>
                <Link to={"/chat"} className={`md:text-[18px] text-[14px] hover:text-violet-950 font-semibold text-gray-500 ${selected ? "text-violet-950" : ""}`}>Shopping Assistant</Link>
            </div>
        </div>


    )
}



// absolute top-8 right-40