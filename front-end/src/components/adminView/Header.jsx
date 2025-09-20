import React from 'react';
import { Button } from '../ui/button';
import { IoIosMenu } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = ({ setOpen }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const result = dispatch(logoutUser()).unwrap();
    result.then(() => navigate("/")).catch(console.log);
  };

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-gray-50 border-b'>
      <Button onClick={() => setOpen(true)} className='lg:hidden sm:block background-transparent bg-gray-700 cursor-pointer text-white font-bold'>
        <IoIosMenu className='block text-3xl font-extrabold' />
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button className='p-2 bg-orange-400 text-white shadow-xs hover:bg-orange-500 cursor-pointer font-bold' onClick={handleLogout}>
          <IoLogOutOutline />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Header;