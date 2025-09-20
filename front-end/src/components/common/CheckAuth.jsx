import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAunthenticated, user, children }) => {

    // console.log("Is Authenticated : ", isAunthenticated);
    // console.log("User data is : ", user);

    const location = useLocation();
    const isAuthPage = location.pathname === "/" || location.pathname === "/register";
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isShopProtectedRoute = ["/shop/checkout", "/shop/my-orders", "/shop/account"].includes(location.pathname);
    
    // 1. Redirect unauthenticated users trying to access protected routes
    if (!isAunthenticated && (isAdminRoute || isShopProtectedRoute)) {
        return <Navigate to="/" />;
    }

    // 2. Redirect authenticated users away from login/register
    if (isAunthenticated && isAuthPage) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop" />;
        }
    }

    // 3. Redirect non-admin users trying to access admin routes
    if (isAunthenticated && isAdminRoute && user?.role !== "admin") {
        return <Navigate to="/unauthorized" />;
    }

    // 4. Redirect admin users trying to access shop routes (optional logic)
    if (isAunthenticated && user?.role === "admin" && location.pathname.startsWith("/shop")) {
        return <Navigate to="/admin/dashboard" />;
    }

    // ✅ 5. All checks passed, render the route
    return <>{children}</>;
};

export default CheckAuth;