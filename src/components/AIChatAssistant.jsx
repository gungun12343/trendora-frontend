import { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom"

export const AIChatAssistant = () => {
    const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm Trendora Assistant. Ask me about any product.",
    },
  ]);
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, products]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setProducts([]); // Clear previous products

    try {
      const response = await fetch("http://localhost:8080/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      // Add AI reply
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);

      // Add products if available
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error fetching AI response:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong 😅" },
      ]);
    }
  };

  return (
//     <div className="mt-28 flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="p-4 bg-indigo-600 text-white text-xl font-bold text-center">
//         Trendora AI Shopping Assistant 🛍️
//       </div>

//       {/* Input at the top */}
//       <div className="flex p-4 border-b bg-white">
//         <input
//           type="text"
//           placeholder="Ask me about any product..."
//           className="flex-1 p-2 border rounded-l-md outline-none"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700"
//         >
//           ➤
//         </button>
//       </div>

//       {/* Chat & Products */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-3 rounded-xl max-w-[70%] ${
//               msg.sender === "user"
//                 ? "bg-indigo-100 self-end ml-auto"
//                 : "bg-gray-100 self-start"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}

//         {/* Product cards */}
//         {products.length > 0 && (
//           // <div className="grid grid-cols-2 gap-4 mt-4">
//           //   {products.map((prod) => (
//           //     <Link  to={`/shop/product/`+prod.name} state={{prod}}
//           //       className="block border rounded-xl hover:shadow-lg transition-all"
//           //     >
//           //       <img
//           //         src={prod.images[0]}
//           //         alt={prod.name}
//           //         className="h-40 w-full object-cover rounded-t-xl"
//           //       />
//           //       <div className="p-2 text-center">
//           //         <p className="text-sm font-semibold">{prod.name}</p>
//           //         <p className="text-indigo-600 font-bold">₹{prod.price}</p>
//           //       </div>
//           //     </Link>
//           //   ))}
//           // </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//   {products.map((prod) => (
//     <Link
//       key={prod._id}
//       to={`/shop/product/${encodeURIComponent(prod.name)}`}
//       state={{ prod }}
//       className="group relative block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300"
//     >
//       {/* Product Image */}
//       <div className="relative">
//         <img
//           src={prod.images[0]}
//           alt={prod.name}
//           className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//         {/* Quick View Button */}
//         <div className="absolute bottom-3 inset-x-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//           <button className="bg-white text-gray-900 text-sm px-3 py-1.5 rounded-full shadow hover:bg-gray-100 transition">
//             View Details
//           </button>
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="p-3 text-center">
//         <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 line-clamp-2">
//           {prod.name}
//         </p>
//         <p className="text-lg font-bold text-indigo-600 mt-1">₹{prod.price}</p>
//         {prod.brand && (
//           <p className="text-xs text-gray-500 mt-1">{prod.brand}</p>
//         )}
//       </div>

//       {/* Decorative Hover Border */}
//       <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500 rounded-2xl transition-all duration-300"></div>
//     </Link>
//   ))}
// </div>

//         )}

//         <div ref={messagesEndRef} />
//       </div>
//     </div>

      <div className="mt-24 flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50">
         {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-2xl font-extrabold text-center py-5 shadow-lg tracking-wide">
          Trendora AI Shopping Assistant 🛍️
        </div>

        {/* Input at the top */}
        <div className="sticky top-[100px] z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center px-4 py-3 shadow-sm">
          <input
            type="text"
            placeholder="Ask me about any product..."
            className="flex-1 p-3 border border-indigo-200 rounded-l-xl outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-5 py-3 rounded-r-xl font-semibold hover:opacity-90 transition active:scale-95"
          >
            ➤
          </button>
        </div>

        {/* Chat & Products Section */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl max-w-[75%] text-[0.95rem] leading-relaxed shadow-sm transition-all duration-300 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-100 to-indigo-200 self-end ml-auto'
                  : 'bg-white border border-gray-200 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Product Cards */}
          {products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {products.map((prod) => (
                <Link
                  key={prod._id}
                  to={`/shop/product/${encodeURIComponent(prod.name)}`}
                  state={{ prod }}
                  className="group relative block rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 text-center">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 line-clamp-2">
                      {prod.name}
                    </p>
                    <p className="text-lg font-bold text-indigo-600 mt-1">₹{prod.price}</p>
                    {prod.brand && (
                      <p className="text-xs text-gray-500 mt-1 italic">{prod.brand}</p>
                    )}
                  </div>

                  {/* Glow Border Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-400/60 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-500" />
                </Link>
              ))}
            </div>
          )}

      <div ref={messagesEndRef} />
  </div>
</div>

  );
}