import {motion, AnimatePresence} from "framer-motion";

export const BestSellers = () => {
    return (
        <div className="mt-16 mb-10">
            <h2 className="text-4xl mt-16 text-center font-semibold">BEST SELLERS</h2>

            <div className="flex gap-5 mt-10 mx-5 flex-wrap justify-center">
                <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="https://m.media-amazon.com/images/I/71l2sZoikXL._SY550_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Printed Anarkali Kurta and Pant Set</p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 799</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>

                  <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="https://m.media-amazon.com/images/I/713n+TxyfCL._SY550_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Men's Cotton Rich Solid Polo Tshirt</p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 399</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>

                 <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="https://m.media-amazon.com/images/I/71eUwDk8z+L._SY550_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Cotton Regular Fit Polo T-Shirt</p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 699</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>

                 <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="https://m.media-amazon.com/images/I/81T3olLXpUL._SX425_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Samsung Galaxy M05</p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 9999</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>

                 <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="https://m.media-amazon.com/images/I/71fa0Niq9VL._SX425_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Printed King Size Double Bed Bedsheet</p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 2999</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>

                 <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="	https://m.media-amazon.com/images/I/610InQb9rTL._SX425_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Rayon Viscose Straight Bandhej Printed Kurta</p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 1299</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>

                <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="	https://m.media-amazon.com/images/I/7190UVG+FkL._SY550_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Cotton Ikat Print Kurta Set </p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 899</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>

                <motion.div animate={{ boxShadow: ["0px 0px 0px rgba(139,92,246,0)", "0px 0px 20px rgba(139,92,246,0.8)", "0px 0px 0px rgba(139,92,246,0)",] }}
                    transition={{ repeat: Infinity, duration: 2 }} className="relative rounded-xl bg-white p-4 w-72">
                    <img src="https://m.media-amazon.com/images/I/717Q2swzhBL._SX569_.jpg" className="w-72 h-96 rounded-xl" />
                    <p className="font-bold text-lg text-gray-800 px-2 py-1">Samsung Galaxy S24 Ultra 5G AI Smartphone with Galaxy AI</p>
                    <div className="flex justify-between px-2 mb-2">
                        <span className="font-bold">₹ 97999</span>
                        <button className="bg-violet-900 px-2 py-1 rounded-lg text-white font-semibold">Add to Cart</button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}