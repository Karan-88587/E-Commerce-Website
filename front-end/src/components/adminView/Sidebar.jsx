import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoStatsChartSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { BsFillBasketFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { Sheet, SheetContent } from '../ui/sheet';

const Sidebar = ({ open, setOpen }) => {

  const navigate = useNavigate();
  const { pathname } = useLocation(); // 👈 Get current path

  const adminMenu = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <MdDashboard />
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <BsFillBasketFill />
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <FaCartPlus />
    }
  ];

  const getLinkClasses = (path) =>
    `py-4 px-7 flex gap-2 ${pathname === path ? "bg-gray-200 text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <>
      {/* Mobile Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className='w-60 bg-gray-50 h-full border-r'>
          <h1 className='font-bold flex gap-2 mt-12 ms-7 text-2xl cursor-pointer' onClick={() => {
            navigate("/admin/dashboard");
            setOpen(false);
          }}>
            <IoStatsChartSharp className='mt-1' />
            Admin Panel
          </h1>

          <nav className='mt-10'>
            {adminMenu.map((menu) => (
              <ul key={menu.id} className='flex flex-col text-xl cursor-pointer'>
                <li
                  className={getLinkClasses(menu.path)}
                  onClick={() => {
                    navigate(menu.path);
                    setOpen(false);
                  }}
                >
                  <span className='mt-1'>{menu.icon}</span> {menu.label}
                </li>
              </ul>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className='hidden lg:block w-60 bg-gray-50 h-screen border-r'>
        <h1 className='font-bold flex gap-2 mt-4 ms-7 text-2xl cursor-pointer' onClick={() => navigate("/admin/dashboard")}>
          <IoStatsChartSharp className='mt-1' />
          Admin Panel
        </h1>

        <nav className='mt-10'>
          {adminMenu.map((menu) => (
            <ul key={menu.id} className='flex flex-col text-xl cursor-pointer'>
              <li
                className={getLinkClasses(menu.path)}
                onClick={() => navigate(menu.path)}
              >
                <span className='mt-1'>{menu.icon}</span> {menu.label}
              </li>
            </ul>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;