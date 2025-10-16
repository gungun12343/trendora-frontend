import {useSelector, useDispatch} from "react-redux";
import {clearCart, removeFromCart, addToCart, decQuantity} from "../utils/cartSlice"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons"
import {useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const Cart = () => {
    const {items} = useSelector((state) => state.cart);
    const {loggedIn} = useSelector((state) => state.auth);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price*item.quantity), 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const handleIncreaseQuantity = (item) => {
        dispatch(addToCart(item));
    }

    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item));
        toast.success("Item removed from cart", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }

    const handleDecrementQuantity = (item) => {
        dispatch(decQuantity(item));
    }

    const handleClick = () => {
        if(!loggedIn) {
            navigate("/login", {state: {from: location}, replace: true});
        } else {
            navigate("/checkout")
        }
    }

    return (
        <div className="md:mt-28 mt-20 flex md:flex-row flex-col mr-5">
            <div className="md:w-2/3 w-full p-5">
                <h2 className="md:text-2xl text-xl font-semibold mb-5">{items.length > 0 ? "Your Shopping Cart" : "Your cart is empty"}</h2>

                <div>
                    {items.map((item) => (
                        <div key={item._id} className="mb-4 p-3 bg-violet-200 rounded-lg flex">
                            <div className="w-44 h-44">
                                <img src={item.image} className="w-full h-full object-cover" />
                            </div>
                            <div className="pl-3 w-full">
                                <h3 className="text-[18px] font-semibold">{item.description}</h3>
                                <div className="flex md:flex-row flex-col justify-between mt-2">
                                    <div className="w-[60%]">
                                        {item.size && <p><b>Size:</b> {item.size}</p>}
                                        <p><b>Color:</b> {item.color}</p>
                                    </div>
                                    <div className="md:w-[20%] w-[30%]">
                                        <div className="bg-white w-full flex justify-around rounded-md py-1 items-center">
                                            <span onClick={() => {if (item.quantity > 1) {
                                                handleDecrementQuantity(item)
                                            } else {
                                                handleRemoveItem(item);
                                            }}}><FontAwesomeIcon icon={faMinus} /></span>
                                            <span className="text-xl font-bold">{item.quantity}</span>
                                            <span onClick={() => handleIncreaseQuantity(item)}><FontAwesomeIcon icon={faPlus} /></span>
                                        </div>
                                    </div>
                                    <div >
                                        <p className="text-lg font-semibold">₹ {item.price}</p>
                                        <button onClick={() => handleRemoveItem(item)} className="mt-3 bg-black text-white px-2 py-1 rounded-md">Remove</button>
                                    </div>
                                </div>
                    
                            </div>
                        </div>
                    ))}
                </div>

                {items.length > 0 && <button className="bg-violet-900 text-white px-2 py-1 rounded-md" onClick={handleClearCart}>Clear Cart</button>}
            </div>
            
            {items.length > 0 && 
            <div className="md:w-1/3 w-[90%] mb-5 p-5 mx-5 md:mt-20 bg-gray-200 h-fit flex flex-col gap-2">
                <h2 className="text-xl font-medium border-b border-b-black pb-2">Order Summary</h2>
                <p className="font-medium">ITEMS : {totalItems}</p>
                <p className="font-medium">SUBTOTAL : ₹ {totalPrice}</p>

                {totalPrice <= 599 && 
                <div className="bg-green-50 text-green-800 p-2 rounded mb-2 font-medium">
                    Don’t Pay for Shipping – Get Free Delivery Above ₹599!
                </div>}

                <p className="font-medium mb-2">SHIPPING : ₹ {totalPrice > 599 ? 0 : 49}</p>
                <p className="font-medium border-t border-t-black pt-2">TOTAL : ₹ {totalPrice > 599 ? totalPrice+0 : totalPrice+49}</p>

                <button onClick={handleClick} className="bg-violet-900 text-white w-full font-semibold py-1">CHECKOUT</button>
            </div>
            }
        </div>
    )
}