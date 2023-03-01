import "./App.css";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter as Navigation } from "react-router-dom";

const Products = React.lazy(() => import("./pages/Products"));
const Details = React.lazy(() => import("./pages/productDetail"));
const Login = React.lazy(() => import("./pages/login"));
const Carrito = React.lazy(() => import("./pages/CarritoContainer"));
const Registrarse = React.lazy(() => import('./pages/Registrarse'));
const Perfil = React.lazy(() => import('./pages/Perfil'));
const Manager = React.lazy(() => import('./pages/Manager'));
function App() {
  return (
    <Navigation>
      <Navbar />
      <Suspense fallback="loading...">
        <Routes>
          <Route path="/manager" element={<Manager/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/registro" element={<Registrarse/>}/>
          <Route path="/model/:id" element={<Details />} /> //! los dos puntitos
          estan declarando que el id va a ser dinamico
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </Suspense>
    </Navigation>
  );
}

export default App;
