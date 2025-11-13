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
   const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
  // Load previous chat
  const savedMessages = localStorage.getItem("trendora_chat_messages");
  const savedProducts = localStorage.getItem("trendora_chat_products");

  if (savedMessages) setMessages(JSON.parse(savedMessages));
  if (savedProducts) setProducts(JSON.parse(savedProducts));

   setHasLoaded(true);
}, []);

useEffect(() => {
  // Save chat progress
  if (!hasLoaded) return;
  localStorage.setItem("trendora_chat_messages", JSON.stringify(messages));
  localStorage.setItem("trendora_chat_products", JSON.stringify(products));
}, [messages, products, hasLoaded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, products]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // const newMessages = [...messages, { sender: "user", text: input }];
    // setMessages(newMessages);
    // setInput("");
    // setProducts([]);
    setMessages([{ sender: "user", text: input }]);
    setInput("");
    setProducts([]);

    try {
      const response = await fetch("http://localhost:8080/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      //setMessages([...newMessages, { sender: "bot", text: data.reply }]);
      setMessages([
        { sender: "user", text: input },
        { sender: "bot", text: data.reply },
      ]);

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

  // const handleSend = async () => {
  //   const newMessages = [...messages, { sender: "user", text: input }];
  //   setMessages(newMessages);
  //   setInput("");

  //   const res = await fetch("/ai-assistant", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ message: input }),
  //   });

  //   const data = await res.json();

  //   // ✅ Attach products to the bot message itself
  //   const botMessage = {
  //     sender: "bot",
  //     text: data.reply,
  //     products: data.products || [],  // link products here
  //   };

  //   const updatedMessages = [...newMessages, botMessage];
  //   setMessages(updatedMessages);

  //   // ✅ Save all messages (with products) to localStorage
  //   localStorage.setItem("trendora_chat_messages", JSON.stringify(updatedMessages));
  // };


  return (

      <div className="mt-24 flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50">

        <div className="sticky top-0 z-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-2xl font-extrabold text-center py-5 shadow-lg tracking-wide">
          Trendora AI Shopping Assistant 🛍️
        </div>

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

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
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

          {products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {products.map((prod) => (
                <Link
                  key={prod._id}
                  to={`/shop/product/${encodeURIComponent(prod.name)}`}
                  state={{ prod }}
                  className="group relative block rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 line-clamp-2">
                      {prod.name}
                    </p>
                    <p className="text-lg font-bold text-indigo-600 mt-1">₹{prod.price}</p>
                    {prod.brand && (
                      <p className="text-xs text-gray-500 mt-1 italic">{prod.brand}</p>
                    )}
                  </div>

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