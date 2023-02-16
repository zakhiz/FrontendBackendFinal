import "./App.css";
import React, { Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter as Navigation } from "react-router-dom";

const Products = React.lazy(() => import("./pages/Products"));
const Details = React.lazy(() => import("./pages/productDetail"))
const Login = React.lazy(()=> import("./pages/login"))
function App() {
  


  return (
    <Navigation>
     
      <Navbar />
      <Suspense fallback="loading...">
        <Routes>
          <Route path="/model/:id" element={<Details/>}/> //! los dos puntitos estan declarando que el id va a ser dinamico
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Products />} />
        </Routes>
      </Suspense>
    </Navigation>
  );
}

export default App;
