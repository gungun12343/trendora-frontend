import { useSelector, useDispatch } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleCheck, faCircleExclamation} from "@fortawesome/free-solid-svg-icons"
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {clearCart} from "../utils/cartSlice"

export const Checkout = () => {
    const [data, setData] = useState({firstname: "", lastname: "", phone: "", address: "", code: "", city: "", state: ""});
    const {items} = useSelector((state) => state.cart);
    const totalPrice = items.reduce((sum, item) => sum + (item.price*item.quantity), 0);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [states, setStates] = useState([
        {code: "AP", name: "Andhra Pradesh"},
        {code: "AR", name: "Arunachal Pradesh"},
        {code: "AS", name: "Assam"},
        {code: "BR", name: "Bihar"},
        {code: "CG", name: "Chhattisgarh"},
        {code: "GA", name: "Goa"},
        {code: "GJ", name: "Gujarat"},
        {code: "HR", name: "Haryana"},
        {code: "HP", name: "Himachal Pradesh"},
        {code: "JH", name: "Jharkhand"},
        {code: "KA", name: "Karnataka"},
        {code: "KL", name: "Kerala"},
        {code: "MP", name: "Madhya Pradesh"},
        {code: "MH", name: "Maharashtra"},
        {code: "MN", name: "Manipur"},
        {code: "ML", name: "Meghalaya"},
        {code: "MZ", name: "Mizoram"},
        {code: "NL", name: "Nagaland"},
        {code: "OD", name: "Odisha"},
        {code: "PB", name: "Punjab"},
        {code: "RJ", name: "Rajasthan"},
        {code: "SK", name: "Sikkim"},
        {code: "TN", name: "Tamil Nadu"},
        {code: "TG", name: "Telangana"},
        {code: "TR", name: "Tripura"},
        {code: "UK", name: "Uttrakhand"},
        {code: "UP", name: "Uttar Pradesh"},
        {code: "WB", name: "West Bengal"}
    ])
    const statesWithCities = [
  {
    state: "Andhra Pradesh",
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kadapa"]
  },
  {
    state: "Arunachal Pradesh",
    cities: ["Itanagar", "Naharlagun", "Pasighat", "Roing", "Ziro", "Tawang", "Bomdila", "Tezu"]
  },
  {
    state: "Assam",
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Karimganj"]
  },
  {
    state: "Bihar",
    cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Arrah", "Begusarai"]
  },
  {
    state: "Chhattisgarh",
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Raigarh", "Jagdalpur", "Ambikapur"]
  },
  {
    state: "Delhi",
    cities: ["New Delhi", "Dwarka", "Saket", "Karol Bagh", "Rohini", "Connaught Place", "Vasant Kunj", "Lajpat Nagar"]
  },
  {
    state: "Goa",
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Canacona"]
  },
  {
    state: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar"]
  },
  {
    state: "Haryana",
    cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar", "Karnal", "Sonipat", "Rohtak"]
  },
  {
    state: "Himachal Pradesh",
    cities: ["Shimla", "Dharamshala", "Solan", "Mandi", "Bilaspur", "Kullu", "Una", "Chamba"]
  },
  {
    state: "Jharkhand",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Chaibasa"]
  },
  {
    state: "Karnataka",
    cities: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi", "Belagavi", "Davangere", "Shivamogga", "Ballari"]
  },
  {
    state: "Kerala",
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Kannur", "Palakkad"]
  },
  {
    state: "Madhya Pradesh",
    cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Ratlam", "Rewa"]
  },
  {
    state: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur"]
  },
  {
    state: "Manipur",
    cities: ["Imphal", "Thoubal", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Bishnupur", "Tamenglong"]
  },
  {
    state: "Meghalaya",
    cities: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Williamnagar", "Resubelpara", "Mairang"]
  },
  {
    state: "Mizoram",
    cities: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Mamit", "Lawngtlai"]
  },
  {
    state: "Nagaland",
    cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek"]
  },
  {
    state: "Odisha",
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur", "Balasore", "Baripada", "Jharsuguda"]
  },
  {
    state: "Punjab",
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot"]
  },
  {
    state: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur"]
  },
  {
    state: "Sikkim",
    cities: ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Singtam", "Rangpo", "Soreng", "Rhenock"]
  },
  {
    state: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore"]
  },
  {
    state: "Telangana",
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar", "Ramagundam", "Adilabad"]
  },
  {
    state: "Tripura",
    cities: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Ambassa", "Khowai", "Sonamura"]
  },
  {
    state: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Ghaziabad", "Meerut", "Noida"]
  },
  {
    state: "Uttarakhand",
    cities: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Nainital", "Kashipur", "Rudrapur", "Roorkee"]
  },
  {
    state: "West Bengal",
    cities: ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah", "Bardhaman", "Kharagpur", "Haldia"]
  }
    ];
    const majorCities = selectedState ? statesWithCities.find((s) => s.state === selectedState)?.cities || [] : [];


    const validate = () => {
        const newError = {};

        if(!data.firstname) {
            newError.firstname = "firstname is required"
        } else if(!/^[a-zA-Z]+$/.test(data.firstname)) {
            newError.firstname = "firstname is not valid"
        }

        if(!data.lastname) {
            newError.lastname = "lastname is required"
        } else if(!/^[a-zA-Z]+$/.test(data.lastname)) {
            newError.lastname = "lastname is not valid"
        }

        if(!data.phone) {
            newError.phone = "Phone number is required"
        } else if(!/^\d{10}$/.test(data.phone)) {
            newError.phone = "Phone number is not valid"
        }

        if(!data.address) {
            newError.address = "Address is required"
        } else if(!/^[a-zA-Z0-9\s,.'-]{3,}$/.test(data.address)) {
            newError.address = "Address is not valid"
        }

        if(!data.code) {
            newError.code = "Postal code is required"
        } else if(!/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(data.code)) {
            newError.code = "Postal code is not valid"
        }

        if(!selectedCity) {
            newError.city = "City is required"
        } 
        // else if(!/^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$/.test(data.city)) {
        //     newError.city = "City is not valid"
        // }

        if(!selectedState) {
            newError.state = "State is required"
        } 
        // else if(!/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(data.state)) {
        //     newError.state = "State is not valid"
        // }

        return newError;
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name]:e.target.value});
        setErrors({});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        setSubmitted(true);

        const ShippingAddress = {
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          streetAddress: data.address,
          city: selectedCity,
          state: selectedState,
          postalCode: data.code
        };

        if(Object.keys(validationErrors).length == 0) {
          axios.post("https://trendora-backend-1-we1g.onrender.com/cart", {items}, {withCredentials: true}).then((res) => 
            axios.post("https://trendora-backend-1-we1g.onrender.com/checkout", {ShippingAddress}, {withCredentials: true}).then((res) => {
              dispatch(clearCart());
              if(res.status == 201) {
                toast.success("Order placed successfully", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  onClose: () => navigate("/")
                })
              }
            })
            .catch((err) => console.log(err))
          ).catch(err => console.log(err))
        }
    }

    return (
        <div className="md:px-10 px-5">
            <h2 className="md:mt-32 mt-24 md:text-3xl text-xl font-medium mb-3">Checkout</h2>

            <div className="flex md:flex-row flex-col justify-center gap-10">
                <div className="lg:w-1/3 md:w-2/3 w-full">
                    <h2 className="md:text-xl text-lg font-semibold pl-5">Shipping Address</h2>
                    <form onSubmit={handleSubmit} className="w-full flex flex-wrap p-5 gap-3">

                        <div className="flex gap-2 w-full">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="firstname" className="font-medium">First Name</label>
                                <input onChange={handleChange} id="firstname" name="firstname" value={data.firstname} className="px-2 py-1 outline-none border border-black w-full" />
                                {submitted && errors.firstname && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.firstname}</p>}
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="lastname" className="font-medium">Last Name</label>
                                <input onChange={handleChange} id="lastname" name="lastname" value={data.lastname} className="border px-2 py-1 outline-none border-black w-full" />
                                {submitted && errors.lastname && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.lastname}</p>}
                            </div>
                        </div>


                        <div className="flex flex-col w-full">
                            <label htmlFor="phone" className="font-medium">Phone Number</label>
                            <input onChange={handleChange} id="phone" name="phone" value={data.phone} className="w-full border px-2 py-1 outline-none border-black" />
                            {submitted && errors.phone && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.phone}</p>}
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="address" className="font-medium">Street Address</label>
                            <input onChange={handleChange} id="address" name="address" value={data.address} className="w-full border px-2 py-1 outline-none border-black" />
                            {submitted && errors.address && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.address}</p>}
                        </div>

                        {/* <div className="flex flex-col w-full">
                            <label htmlFor="state" className="font-medium">State</label>
                            <input onChange={handleChange} id="state" name="state" value={data.state} className="w-full border px-2 py-1 outline-none border-black" />
                            {submitted && errors.state && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.state}</p>}
                        </div> */}

                        <div className="flex flex-col w-full">
                            <label htmlFor="state" className="font-medium">State</label>
                            <select id="state" name="state" value={selectedState} className="w-full border px-2 py-1 outline-none border-black" onChange={(e) => {setSelectedState(e.target.value); setSelectedCity("")}}>
                                <option value="">Select state</option>
                                {states.map((state) => (
                                    <option key={state.code} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                            {submitted && errors.state && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.state}</p>}
                        </div>


                        <div className="flex gap-2 w-full">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="code" className="font-medium">Postal Code</label>
                                <input onChange={handleChange} id="code" name="code" value={data.code} className="w-full border px-2 py-1 outline-none border-black" />
                                {submitted && errors.code && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.code}</p>}
                            </div>
                            {/* <div className="flex flex-col w-1/2">
                                <label htmlFor="city" className="font-medium">Town/City</label>
                                <input onChange={handleChange} id="city" name="city" value={data.city} className="w-full border px-2 py-1 outline-none border-black" />
                                {submitted && errors.city && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.city}</p>}
                            </div> */}

                            <div className="flex flex-col w-1/2">
                                <label htmlFor="city" className="font-medium">Town/City</label>
                                 <input
                                    list="city-options"
                                    id="city"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    placeholder="Enter or select your city"
                                    className="w-full border px-2 py-1 outline-none border-black"
                                />
                                <datalist id="city-options">
                                    {majorCities.map((c) => (
                                    <option key={c} value={c} />
                                    ))}
                                </datalist>
                                {submitted && errors.city && <p className="text-red-700 text-sm ml-1 mb-2"><FontAwesomeIcon icon={faCircleExclamation} /> {errors.city}</p>}
                            </div>
                        </div>

                        <button className="bg-black text-white w-full py-1 mt-3">Place Order</button>
                    </form>
                </div>

                <div className="lg:w-[25%] md:w-[35%] w-full bg-gray-300 mb-5 p-5 h-fit">
                    <h2 className="md:text-xl text-lg font-semibold mb-3">Order Summary</h2>

                    <div className="w-full flex justify-between md:text-lg text-base mb-2">
                        <p>Subtotal </p>
                        <p> ₹ {totalPrice}</p>
                    </div>

                    <div className="w-full flex justify-between md:text-lg text-base mb-2">
                        <p>Shipping </p>
                        <p>₹ {totalPrice > 599 ? 0 : 49}</p>
                    </div>

                    <div className="w-full flex justify-between font-medium md:text-lg text-base mb-2">
                        <p>Total </p>
                        <p>₹ {totalPrice > 599 ? totalPrice+0 : totalPrice+49}</p>
                    </div>
                    
                    <div className="mb-2">
                        <p className="font-medium md:text-lg text-base">Payment method</p>
                        <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />
                        <span>Cash on Delivery</span>
                    </div>

                    <Link to={"/cart"}><p className="font-semibold text-blue-800">Edit cart</p></Link>
                </div>
            </div>
        </div>
    )
}