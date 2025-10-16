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
import {ToastContainer} from "react-toastify"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:8080/auth/status", {withCredentials: true}).then((res) => dispatch(setAuth(res.data)))
    .catch((err) => dispatch(setAuth({loggedIn: false, user: null})))
  })
  
  return (
    <>
      <Body />
      <ToastContainer />
    </>
  )
}

export default App
