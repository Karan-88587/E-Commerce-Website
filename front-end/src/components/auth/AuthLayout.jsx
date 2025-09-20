import React from 'react';
import { Outlet } from 'react-router-dom';
import ecommerce from '../../assets/ecommerce.svg';

const AuthLayout = () => {
    return (
        <>
            <div className="flex flex-1">
                {/* Left side only on lg+, now a flex‐container that centers its content */}
                <div className="hidden lg:flex lg:w-1/2 lg:border-r lg:items-center lg:justify-center lg:min-h-screen">
                    <img
                        src={ecommerce}
                        alt="Ecommerce"
                        className="max-w-md"
                    />
                </div>

                {/* Right side always full width on small, half on lg+ */}
                <div className="w-full lg:w-1/2">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default AuthLayout;