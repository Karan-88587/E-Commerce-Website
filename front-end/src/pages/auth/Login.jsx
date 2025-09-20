import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/authSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();

        if (!(data.email && data.password)) {
            Swal.fire("Error", "All fields are required", "error");
            return;
        }

        if (data.email === "") {
            setError({ ...error, email: "Email is required" });
            return;
        }

        if (data.password === "") {
            setError({ ...error, password: "Password is required" });
            return;
        }

        const result = dispatch(loginUser(data)).unwrap();
        // console.log("Result is :", result);
        result
            .then((data) => {
                Swal.fire("Success", "User logged in successfully", "success");
            })
            .catch((error) => Swal.fire("Error", error, "error"));
    };

    return (
        <>
            <div className='min-h-screen flex items-center justify-center'>
                <div className='bg-gray-200 shadow-xl border border-gray-200 p-8 w-100 space-y-3'>
                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor="email" className='text-gray-600 text-sm font-bold'>
                            Email
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input type="text" placeholder='Enter your email' className='border border-gray-400 p-2' value={data.email} onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                            setError({ ...error, email: "" });
                        }} />
                    </div>

                    <div className='flex flex-col space-y-1 relative'>
                        <Label htmlFor="password" className='text-gray-600 text-sm font-bold'>
                            Password
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input type={showPassword ? "text" : "password"} placeholder='Enter your password' className='border border-gray-400 p-2' value={data.password} onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                            setError({ ...error, password: "" });
                        }} />
                        <div className='absolute top-8.5 right-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            <span>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <Button className='p-2 bg-orange-400 text-white shadow-xs hover:bg-orange-500 cursor-pointer font-bold' onClick={handleLogin}>Login</Button>
                        <span className='text-gray-600'>
                            Don't have an account?
                            <Link to="/register"><b className='cursor-pointer text-blue-800 hover:border-b border-blue-800'> Register Here</b></Link>
                        </span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Login;