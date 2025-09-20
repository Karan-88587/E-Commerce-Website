import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const ShoppingLayout = () => {
  return (
    <>
      <Header />
      <div className='border border-gray-200'></div>
      <Outlet />
      <Footer />
    </>
  );
}

export default ShoppingLayout;