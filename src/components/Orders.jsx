import { useEffect, useState } from "react"
import axios from "axios";
import {useSelector} from "react-redux"

export const Orders = () => {
    const [orders, setOrders] = useState(null);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const {loggedIn} = useSelector((state) => state.auth)

    useEffect(() => {
        if(loggedIn) {
            axios.get("http://localhost:8080/orders", {withCredentials: true}).then((res) => {
                //console.log(res.data);
                setOrders(res.data);
            })
            .catch((err) => console.log(err))
        }
        
    }, [loggedIn])

    if(!loggedIn) {
        return <h2>Please login to see your orders!</h2>
    }

    if(orders === null) return;

    return (
        <div className="md:mt-24 mt-20 p-5 flex flex-col gap-6 items-center">
            <h1 className="md:text-3xl text-xl font-bold text-center">Your Orders</h1>
            {
                orders.map((order) => (
                    <div key={order._id} className="border p-3 md:w-[60%] w-full">
                        <h2 className="text-xl font-semibold">Order Id: {order._id}</h2>
                        <div className="border-b border-b-gray-300 pb-3">
                            <span className="border-r border-r-gray-500 pr-4">Order Date: {new Date(order.createdAt).toLocaleString('en-US', options)}</span>
                            <span className="pl-4 text-green-700 font-medium">Estimated Delivery: {new Date(order.deliveryDate).toLocaleString('en-US', options)}</span>
                        </div>

                        {
                            <div className="border-b border-b-gray-300 pb-3">{
                                order.items.map((item) => (
                                    <div key={item._id} className="mt-3 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img src={item.image} className="w-[80px] h-[80px]" />
                                            <div>
                                                <p>{item.name}</p>
                                                <p><span className="border-r border-r-gray-500 pr-3">{item.color}</span><span className="pl-3">{item.size}</span></p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <p className="text-lg font-medium">₹ {item.price}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                        <p className="mt-3"><b>Payment:</b> Cash On Delivery</p>

                        <p><b>Delivering to:</b> {order.address.firstname} {order.address.lastname}</p>

                        <p><b>Delivery Address:</b> {order.address.streetAddress}, {order.address.city}, {order.address.state}</p>

                        <p><b>Total Amount:</b> ₹ {order.totalAmount}</p>
                    </div>
                ))
            }
        </div>
    )
}