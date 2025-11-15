// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { useEffect } from "react";
import { Body } from "./components/Body"
import {useDispatch} from "react-redux";
import axios from "axios";
import {setAuth} from "./utils/authSlice"
import { ScrollToTop } from "./components/ScrollToTop";
import {ToastContainer} from "react-toastify";
import {setFeatured} from "./utils/featuredSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://trendora-backend-1-we1g.onrender.com/auth/status", {withCredentials: true}).then((res) => dispatch(setAuth(res.data)))
    .catch((err) => dispatch(setAuth({loggedIn: false, user: null})))
  })

  useEffect(() => {
    axios.get("https://trendora-backend-1-we1g.onrender.com/products", {withCredentials: true}).then((res) => {
            const data = res.data.filter((prod) => prod.featured === true);
          setFeatured(data);
    })
  }, [])
  
  return (
    <>
      <Body />
      <ToastContainer />
    </>
  )
}

export default App
