import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice";
import AuthLayout from "./components/auth/AuthLayout";
import CheckAuth from "./components/common/CheckAuth";
import Loader from "./components/common/Loader";

// Login & Register Imports
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// Admin Imports
import AdminLayout from "./components/adminView/AdminLayout";
import Dashboard from "./pages/adminView/Dashboard";
import Products from "./pages/adminView/Products";
import Orders from "./pages/adminView/Orders";

// Shopping/User Imports
import ShoppingLayout from "./components/shoppingView/ShoppingLayout";
import Home from "./pages/shoppingView/Home";
import ProductListing from "./pages/shoppingView/ProductListing";
import Order from "./pages/shoppingView/Order";
import Cart from "./pages/shoppingView/Cart";
import Checkout from "./pages/shoppingView/Checkout";
import Account from "./pages/shoppingView/Account";

// Other Imports
import Unauthorized from "./pages/unauthorized/Unauthorized";
import NotFound from "./pages/notFound/NotFound";

function App() {

  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log("Is Authenticated : ", isAuthenticated);
  // console.log("User :", user);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Login Routes */}
      <Route path="/" element={
        <CheckAuth isAunthenticated={isAuthenticated} user={user}>
          <AuthLayout />  {/* AuthLayout is called children of CheckAuth Component */}
        </CheckAuth>
      }>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <CheckAuth isAunthenticated={isAuthenticated} user={user}>
          <AdminLayout /> {/* AdminLayout is called children of CheckAuth Component */}
        </CheckAuth>
      }>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>

      {/* Shopping Routes */}
      <Route path="/shop" element={
        <CheckAuth isAunthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />  {/* ShoppingLayout is called children of CheckAuth Component */}
        </CheckAuth>
      }>
        <Route path="" element={<Home />} />
        <Route path="products" element={<ProductListing />} />
        <Route path="my-orders" element={<Order />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="account" element={<Account />} />
      </Route>

      {/* Not Found & Unauthorized Routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;