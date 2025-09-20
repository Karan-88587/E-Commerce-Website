import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/authSlice';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    const handleRegister = (e) => {
        e.preventDefault();

        if (!(data.firstName && data.lastName && data.email && data.password && data.confirmPassword)) {
            Swal.fire("Error", "All fields are required", "error");
            return;
        }

        if (data.firstName === "") {
            setError({ ...error, firstName: "First Name is required" });
            return;
        }

        if (data.lastName === "") {
            setError({ ...error, lastName: "Last Name is required" });
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

        if (data.confirmPassword === "") {
            setError({ ...error, confirmPassword: "Confirm Password is required" });
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError({ ...error, confirmPassword: "Password and Confirm Password must be same" });
            return;
        }

        if (data.password.length < 8 || data.password.length > 16) {
            setError({ ...error, password: "Password must be between 8 to 16 characters long" });
            return;
        }

        const result = dispatch(registerUser(data)).unwrap();
        // console.log("Result is :", result);
        result
            .then((data) => {
                Swal.fire("Success", "User registered successfully", "success");
                navigate("/");
            })
            .catch((error) => Swal.fire("Error", error, "error"));
    };

    return (
        <>
            <div className='min-h-screen flex items-center justify-center'>
                <div className='bg-gray-200 shadow-xl border border-gray-200 p-8 w-100 space-y-3'>
                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor="firstName" className='text-gray-600 text-sm font-bold'>
                            First Name
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input type="text" placeholder='Enter your first name' className='border border-gray-400 p-2' value={data.firstName} onChange={(e) => {
                            setData({ ...data, firstName: e.target.value });
                            setError({ ...error, firstName: "" });
                        }} />
                        <p className='text-red-500 text-sm'>{error.firstName}</p>
                    </div>

                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor="lastName" className='text-gray-600 text-sm font-bold'>
                            Last Name
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input type="text" placeholder='Enter your last name' className='border border-gray-400 p-2' value={data.lastName} onChange={(e) => {
                            setData({ ...data, lastName: e.target.value });
                            setError({ ...error, lastName: "" });
                        }} />
                        <p className='text-red-500 text-sm'>{error.lastName}</p>
                    </div>

                    <div className='flex flex-col space-y-1'>
                        <Label htmlFor="email" className='text-gray-600 text-sm font-bold'>
                            Email
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input type="text" placeholder='Enter your email' className='border border-gray-400 p-2' value={data.email} onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                            setError({ ...error, email: "" });
                        }} />
                        <p className='text-red-500 text-sm'>{error.email}</p>
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
                        <p className='text-red-500 text-sm'>{error.password}</p>
                        <div className='absolute top-8.5 right-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                            <span>{showPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                        </div>
                    </div>

                    <div className='flex flex-col space-y-1 relative'>
                        <Label htmlFor="password" className='text-gray-600 text-sm font-bold'>
                            Confirm Password
                            <span className="text-red-600">*</span>
                        </Label>
                        <Input type={showConfirmPassword ? "text" : "password"} placeholder='Enter confirm password' className='border border-gray-400 p-2' value={data.confirmPassword} onChange={(e) => {
                            setData({ ...data, confirmPassword: e.target.value })
                            setError({ ...error, confirmPassword: "" });
                        }} />
                        <p className='text-red-500 text-sm'>{error.confirmPassword}</p>
                        <div className='absolute top-8.5 right-2 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <span>{showConfirmPassword ? <IoEye /> : <IoMdEyeOff />}</span>
                        </div>
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <Button className='p-2 bg-orange-400 text-white shadow-xs hover:bg-orange-500 cursor-pointer font-bold' onClick={handleRegister}>
                            Register
                        </Button>
                        <span className='text-gray-600'>
                            Already have an account?
                            <Link to="/"><b className='cursor-pointer text-blue-800 hover:border-b border-blue-800'> Login Here</b></Link>
                        </span>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Register;