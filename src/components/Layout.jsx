import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setCart} from "../utils/cartSlice"
import axios from "axios";

export const Layout = () => {
  const location = useLocation();
  const noLayout = ["/login"];
  const hideLayout = noLayout.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Header />}
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};
