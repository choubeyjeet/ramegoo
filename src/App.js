import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Home/HomePage";
import { ProductPage } from "./Home/ProductPage";
import { Signup } from "./Login/Signup";
import { Login } from "./Login/Login";
import { ForgetPassword } from "./Login/ForgetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
