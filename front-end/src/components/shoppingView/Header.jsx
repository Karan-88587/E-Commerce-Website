import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authSlice';
import { Input } from '../ui/input';
import { MdStoreMallDirectory } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { CiShoppingCart } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [searchedProduct, setSearchedProduct] = useState("");

  const handleLogin = () => {
    if (location.pathname === "/") return;
    navigate("/");
  };

  const handleLogout = () => {
    const result = dispatch(logoutUser()).unwrap();
    result.then(() => navigate("/")).catch(console.log);
  };

  const handleSearch = () => {
    if (location.pathname === "/shop/products") return;
    navigate("/shop/products");
  };

  const handleProfile = () => {
    if (location.pathname === "/shop/account") return;
    navigate("/shop/account");
  };

  const handleCart = () => {
    if (location.pathname === "/shop/cart") return;
    navigate("/shop/cart");
  };

  const handleOrder = () => {
    if (location.pathname === "/shop/my-orders") return;
    navigate("/shop/my-orders");
  };

  return (
    <header className='flex items-center justify-between px-4 py-3'>
      <div className='flex items-center gap-2 cursor-pointer'>
        <MdStoreMallDirectory className='text-4xl' onClick={() => navigate("/")} />
        <h1 className='hidden lg:block'>MyStore</h1>
      </div>

      <div className='w-72 lg:w-1/2 flex items-center gap-2'>
        <Input type=" text" placeholder='Search for products' value={searchedProduct} onChange={(e) => setSearchedProduct(e.target.value)} />
        <Button className='cursor-pointer bg-green-700 hover:bg-green-600' disabled={!searchedProduct} onClick={handleSearch}>Search</Button>
      </div>

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2 relative' onClick={handleCart}>
          <CiShoppingCart className='cursor-pointer text-4xl' />
          <span className='bg-slate-600 text-sm rounded-full w-6 h-6 flex items-center justify-center text-white absolute bottom-4 left-4'>
            8
          </span>
        </div>

        {user ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='cursor-pointer border border-gray-300'>
                  <AvatarImage src="" />
                  <AvatarFallback>{user?.firstName[0].toUpperCase() + user?.lastName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 mr-2">
                <DropdownMenuCheckboxItem className='cursor-pointer' onClick={handleProfile}>
                  <div className='flex items-center gap-2'>
                    <FaUserCircle />
                    Edit Profile
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem className='cursor-pointer' onClick={handleOrder}>
                  <div className='flex items-center gap-2'>
                    <CiShoppingCart />
                    My Orders
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem className='cursor-pointer' onClick={handleLogout}>
                  <IoIosLogOut />
                  Logout
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button className='cursor-pointer bg-white border border-green-600 text-slate-600 hover:bg-green-600 hover:text-white font-bold' onClick={handleLogin}>Login</Button>
        )}
      </div>
    </header>
  );
}

export default Header;