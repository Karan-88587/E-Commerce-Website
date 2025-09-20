import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { BsCloudUpload } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

const ImageUpload = ({ imageFile, setImageFile, error, setError, isEditingMode }) => {

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        setImageFile(fileArray);
        setError({ ...error, image: "" });
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...imageFile];
        updatedFiles.splice(index, 1);
        setImageFile(updatedFiles);
    };

    return (
        <div>
            <Label className='text-sm mb-2 font-medium text-gray-700'>
                Upload Image <span className='text-red-600'>*</span>
            </Label>

            <Input
                id='file-upload'
                className='hidden'
                type='file'
                name='images'
                multiple
                draggable
                onChange={handleFileChange}
            />

            {/* Upload Button */}
            {imageFile?.length === 0 ? (
                <label
                    htmlFor='file-upload'
                    className='flex flex-col items-center justify-center w-80 min-h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-white hover:bg-gray-50 hover:shadow transition-all duration-200 p-4 mb-4'
                >
                    <BsCloudUpload className='text-3xl text-gray-400 mb-2' />
                    <p className='text-sm font-semibold text-gray-600'>
                        Drag & Drop or <span className='text-blue-600 underline'>Click</span> to Upload
                    </p>
                </label>
            ) : (
                <div className='flex flex-wrap gap-2 mb-4'>
                    {imageFile?.map((file, index) => (
                        <div key={index} className='relative group'>
                            <a href={isEditingMode ? file : URL.createObjectURL(file)} target='_blank' rel='noopener noreferrer'>
                                <img
                                    src={isEditingMode ? file : URL.createObjectURL(file)}
                                    alt={isEditingMode ? "Image" : file.name}
                                    className='w-15 h-15 object-cover rounded-lg border border-gray-300 hover:opacity-90'
                                />
                            </a>
                            {!isEditingMode && <IoIosClose
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRemoveImage(index);
                                }}
                                className='absolute -top-2 -right-2 bg-white rounded-full text-red-500 text-xl shadow cursor-pointer group-hover:scale-110 transition-transform'
                            />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload