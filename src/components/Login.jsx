import { useEffect, useState } from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import {setAuth, setError} from "../utils/authSlice";
import {setCart} from "../utils/cartSlice"
import {useDispatch, useSelector} from "react-redux"
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({username: "", email: "", password: ""});
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {error} = useSelector((state) => state.auth);

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        dispatch(setError(null));
    }, [])

    const validate = () => {
        const newErrors = {};

        if(!isLogin && !formData.email) {
            newErrors.email = "Email is Required"
        } else if(!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please provide a valid email address"
        }

        if(!formData.password) {
            newErrors.password = "Password is required";
        } else if(!isLogin && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(formData.password)) {
            newErrors.password = "Passwords must be atleast 8 characters long and must contain one Uppercase, one LowerCase, one digit and one special symbol"
        }

        if(!formData.username) {
            newErrors.username = "Username is required"
        }

        return newErrors;
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value});
        dispatch(setError(null))
    }

    const handleCart = async () => {
        const res = await axios.get("http://localhost:8080/cart", {withCredentials: true});
        // console.log(res.data);
        const dbCart = res.data.items || [];

        const guestCart = JSON.parse(localStorage.getItem("guestcart")) || [];
        // console.log(guestCart);

        const merged = [...dbCart];
        guestCart.forEach(item => {
            const existing = merged.find(i => i._id === item._id);
            if(existing) {
                existing.quantity += item.quantity;
            } else {
                merged.push(item);
            }
        })
        // console.log(merged);

        await axios.post("http://localhost:8080/cart", {items: merged}, {withCredentials: true});
        dispatch(setCart({items: merged, isLoggedIn: true}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        setFormSubmitted(true);

        if(Object.keys(validationErrors).length === 0) {
            if(!isLogin) {
                axios.post("http://localhost:8080/signup", formData, {withCredentials: true}).then((res) => {
                    dispatch(setAuth(res.data));
                    handleCart();
                    //navigate("/")
                    navigate(from , {replace: true});
                })
                .catch((err) => dispatch(setAuth({loggedIn: false, user: null})))
            } else {
                axios.post("http://localhost:8080/login", {
                    username: formData.username,
                    password: formData.password
                }, {withCredentials: true}).then((res) => {
                    dispatch(setAuth(res.data)); 
                    handleCart();
                    navigate(from , {replace: true})
                })
                .catch((err) => {
                    const msg = err.response?.data?.error || "Login Failed";
                    dispatch(setError(msg));
                    toast.error(msg, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark"
                    })
                })
            }
        }
    }

    return (
        <div className="flex flex-col items-center">
            <img src="/logo.svg" />

            {/* {error && <p className="border-red-600 border-2 text-red-600 w-[30%] px-2 py-1 font-semibold">{error}</p>} */}

            <form onSubmit={handleSubmit} className="border border-gray-500 p-5 flex flex-col lg:w-[30%] md:w-[50%] w-[90%] rounded-lg mt-4">
                <h2 className="text-3xl font-semibold mb-3">{isLogin ? "Sign In": "Create account"}</h2>

                <div className="flex flex-col">
                    <label htmlFor="username" className="font-medium ml-1 mb-1 text-[17px]">Username</label>
                    <input type="text" name="username" id="username" className={`border border-gray-500 mb-2 px-2 py-1 rounded-md ${formSubmitted && errors.username && "border-2 border-red-700 mb-0"}`} value={formData.username} onChange={handleChange} />
                    {formSubmitted && errors.username && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.username}</p>}
                </div>

                {!isLogin && 
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium ml-1 mb-1 text-[17px]">Email</label>
                        <input type="text" name="email" id="email" className={`border border-gray-500 mb-2 px-2 py-1 rounded-md ${formSubmitted && errors.email && "border-2 border-red-700 mb-0"}`} value={formData.email} onChange={handleChange} />
                        {formSubmitted && errors.email && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.email}</p>}
                    </div>
                }

                <div className="flex flex-col">
                    <label htmlFor="password" className="font-medium ml-1 mb-1 text-[17px]">Password</label>
                    <input type="password" name="password" id="password" className={`border border-gray-500 mb-4 px-2 py-1 rounded-md ${formSubmitted && errors.password && "border-2 border-red-700 mb-0"}`} placeholder="Atleast 8 characters" value={formData.password} onChange={handleChange} />
                    {formSubmitted && errors.password && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.password}</p>}
                </div>

                <button className="bg-violet-900 text-white py-2 rounded-3xl">{isLogin ? "Sign In" : "Create your Trendora account"}</button>
            </form>

            
            
            {isLogin && 
                <div className="w-full flex flex-col items-center">
                <p className="border-t mt-6 text-sm w-[30%] border-gray-400 text-gray-500 text-center mb-2">New to Trendora?</p>
                <button className="border font-medium border-gray-500 lg:w-[30%] md:w-[50%] w-[90%] py-2 rounded-3xl" onClick={() => {setIsLogin(!isLogin); setErrors({})}}>Create your Trendora account</button>
                </div>
            }  
            {!isLogin && 
                <div className="mt-4">Already have an account? <span className="cursor-pointer text-violet-900 font-medium" onClick={() => {setIsLogin(!isLogin); setErrors({})}}>Sign In</span> </div>
            }
        </div>
    )
}