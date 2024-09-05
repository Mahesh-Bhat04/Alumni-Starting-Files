import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import {BASE_URL, token} from '../../config'
import {toast} from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'

const Profile = ({user}) => {
    const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({name:user.name, role:user.role, email:user.email, photo:user.photo, gender:user.gender, bloodType:user.bloodType})
    
  }, [user])

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInput = async (event) => {
    const file = event.target.files[0]
    const data = await uploadImageToCloudinary(file);
    
    setSelectedFile(data.url)
    setFormData({...formData, photo: data.url})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res =await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      const {message} = await res.json()

      if(!res.ok) {
        throw new Error(message)
      }

      setLoading(false)
      toast.success(message)
      navigate('/users/profile/me')

    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }
  return (
    <div className="mt-10">
        <form action="" onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value= {formData.name}
                  onChange={handleInput}
                  required
                  className="w-full pr-4 py-3 focus:outline-none border-b border-solid border-[#0066ff61] 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value= {formData.email}
                  onChange={handleInput}
                  aria-readonly
                  readOnly
                  className="w-full pr-4 py-3 focus:outline-none border-b border-solid border-[#0066ff61] 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value= {formData.password}
                  onChange={handleInput}
                  className="w-full pr-4 py-3 focus:outline-none border-b border-solid border-[#0066ff61] 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
                />
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Blood Type"
                  name="bloodType"
                  value= {formData.bloodType}
                  onChange={handleInput}
                  required
                  className="w-full pr-4 py-3 focus:outline-none border-b border-solid border-[#0066ff61] 
                  focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                  placeholder:text-textColor cursor-pointer"
                />
              </div>


              <div className="flex items-center justify-between mb-5">
                <label
                  className="text-headingColor text-[16px] font-bold leading-7"
                >
                  Gender:
                  <select
                    name="gender"
                    value= {formData.gender}
                  onChange={handleInput}
                    className="text-textColor text-[15px] font-semibold leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="select">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Ohter</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {formData.photo && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor 
                 flex items-center justify-center ">
                  <img src={formData.photo} alt="" className="w-full rounded-full" />
                </figure>}


                <div className="relative w-[130px] h-[50px]">
                  <input
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInput}
                    accept=".png, .jpg, .jpeg"
                  />

                  <label
                  htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center
                    px-[0.75rem] py-[0.375rem] text-center text-[15px] leading-6 overflow-hidden
                    bg-[#0066ff46] cursor-pointer text-headingColor font-semibold rounded-lg truncate"
                  >
                    {selectedFile? selectedFile.name : 'Upload Photo'}
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button 
                disabled={loading && true}
                 type="submit"
                 className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg
                 px-4 py-3">
                  {loading ? (
                    <HashLoader size={25} color="#ffffff" /> 
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
    </div>
  )
}

export default Profile