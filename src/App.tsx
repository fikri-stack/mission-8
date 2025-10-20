import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { HomePage } from "./pages/home";
import { ProductsPage } from "./pages/products";
import { ProductsDetailsPage } from "./pages/produtcsDetails";
import { AdminPage } from "./pages/admin";
import { ProfilePage } from "./pages/profile";

import "./firebase";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage}></Route>
        <Route path="/login" Component={LoginPage}></Route>
        <Route path="/register" Component={RegisterPage}></Route>
        <Route path="/products" Component={ProductsPage}></Route>
        <Route path="/product-details/:id" Component={ProductsDetailsPage}></Route>
        <Route path="/admin" Component={AdminPage}></Route>
        <Route path="/profile" Component={ProfilePage}></Route>
      </Routes>
    </Router>
  );
};
