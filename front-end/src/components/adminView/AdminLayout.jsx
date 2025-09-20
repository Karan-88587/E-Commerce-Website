import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='flex'>
        <Sidebar open={open} setOpen={setOpen} />
        <div className='flex flex-col flex-1'>
          <Header setOpen={setOpen} />
          <main className='m-2 lg:m-4 md:m-5'>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLayout;