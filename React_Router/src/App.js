import React from "react";
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Footer from "./component/Footer";
import Header from "./component/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import Try from "./pages/Try";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route index element={<><Header/><Index/><Footer/></>}></Route>
      <Route path="/index" element={<><Header/><Index/><Footer/></>}></Route>
      <Route path="/about" element={<><Header/><About/><Footer/></>}></Route>
      <Route path="/contact" element={<><Header/><Contact/><Footer/></>}></Route>
      <Route path="/services" element={<><Header/><Services/><Footer/></>}></Route>
      <Route path="/shop" element={<><Header/><Shop/><Footer/></>}></Route>
      <Route path="/login" element={<><Header/><Login/><Footer/></>}></Route>
      <Route path="/signup" element={<><Header/><Signup/><Footer/></>}></Route>
      <Route path="/try" element={<><Try/></>}></Route>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
