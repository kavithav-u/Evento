import React, { useState } from 'react'
import { useCreateBannerMutation, useFetchBannerMutation } from '../../Slices/adminApiSlice';
import { toast } from 'react-toastify';
import {Link, useNavigate } from 'react-router-dom';

const CreateNewBanner = () => {

    const [imageURL, setImageURL] = useState([]);
    const[page,setPage] = useState('');
    const [description, setDescription] = useState('');
    const [CreateNewBanner] = useCreateBannerMutation();

    const navigate = useNavigate();

    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        if(file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'up0dzyua');
                formData.append('cloud_name', 'dszrxbtng');
                const response = await fetch('https://api.cloudinary.com/v1_1/dszrxbtng/image/upload', {
                  method: 'POST',
                  body: formData,
                });
                const data = await response.json();
                setImageURL(data.secure_url);
                toast.success('Image uploaded successfully to Cloudinary');
            } catch (err) {
                toast.error('Error uploading image to Cloudinary');
            }
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const banner = {
                description,
                page,
                image:imageURL
            };
            const res = await CreateNewBanner(banner).unwrap();
            console.log(res,"RESS")
            if(res.success) {
                toast.success("New Banner Added");
                navigate('/admin/banner');
            } else {
                toast.error(res.message ||"An Error Occures")
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  return (
<div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create New Banner
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Page"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <textarea
          placeholder="Banner Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
          className="border p-3 rounded-lg"
          multiple
        />

{imageURL && (
          <img
            src={imageURL}
            alt='Selected Event Image'
            style={{ maxWidth: '50px' }}
          />
        )}

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Create
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>
          Return to the <Link to="/admin/banner">Back</Link>
        </p>
      </div>
    </div>
  )
}

export default CreateNewBanner