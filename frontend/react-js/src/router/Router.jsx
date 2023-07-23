import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { Top } from "../components/Top";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Page404 } from "../components/Page404";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/home/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};
