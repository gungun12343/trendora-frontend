import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Home } from "./Home"
import { ShopAll } from "./ShopAll"
import { Product } from "./Product"
import {Layout} from "./Layout"; 
import { Login } from "./Login";
import { Search } from "./Search";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";
import { Orders } from "./Orders";
import { BuyNow } from "./BuyNow";
import { AboutUs }  from "./AboutUs";
import { ContactUs } from "./ContactUs";
import { AIChatAssistant } from "./AIChatAssistant";

export const Body = () => {
    const appRouter = createBrowserRouter([ 
        // {
        //     path: "/",
        //     element: <Home />
        // },
        // {
        //     path: "/shop",
        //     element: <ShopAll />
        // },
        // {
        //     path: "/shop/category/:cat",
        //     element: <ShopAll />
        // }, 
        // {
        //     path: "/shop/product/:name",
        //     element: <Product />
        // },
        {
            path: "/",
            element: <Layout />,
            children: [
                {index: true, element: <Home />},
                {path: "/shop", element: <ShopAll />},
                {path: "/shop/product/:name", element: <Product />},
                {path: "/login", element: <Login />},
                {path: "/search", element: <Search />},
                {path: "/cart", element: <Cart />},
                {path: "/checkout", element: <Checkout />},
                {path: "/order", element: <Orders />},
                {path: "/buynow", element: <BuyNow />},
                {path: "/about", element: <AboutUs />},
                {path: "/contact", element: <ContactUs />},
                {path: "/chat", element: <AIChatAssistant />}
            ]
        }
    ])

    return (
        <RouterProvider router={appRouter} />
    )
}