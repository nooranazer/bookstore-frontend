import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../style/EditProfile.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  username: yup.string()
  .required('name is required'),
  email: yup
  .string()
  .required
  ('email is required'),

   //img is optional
  image: yup
      .mixed()
      .test("fileType", "Only jpg, jpeg or png files are allowed", (value) => {
        if (!value || value.length === 0) return true; // allow no image
        return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
      })
})

const EditProfile = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [user, setUser] = useState({
    // username: '',
    // email: '',
    // role: '',
    // image: ''
  });

  const [file ] = useState(null); //setFile before validation
   const {register, handleSubmit, formState: {errors}, reset} = useForm({
      resolver: yupResolver(schema),})

  useEffect(() => {
    api.get('/user/viewprofile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const data = res.data.data
      setUser(data)
      reset(data)
    })
    .catch(() => {
      alert('Failed to fetch user data');
    });
  }, [token, reset]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     [name]: value
  //   }));
  // };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleSubmitButton = (data) => {
    

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    if (file) {
      formData.append('image', file);
    }

    api.patch('/user/editprofile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      alert('✅ Profile updated successfully');
      navigate('/viewprofile');
    })
    .catch((error) => {
      console.error(' Error updating profile:', error);
      alert('Failed to update profile');
    });
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit(handleSubmitButton)} encType="multipart/form-data">
        <label>Username</label>
        <input 
        type="text" 
        {...register ('username')}
        // name="username"
        // value={user.username} 
        // onChange={handleChange} 
        // required 
        />
        {errors.username && <p className='text-danger'>{errors.username.message}</p>}

        <label>Email</label>
        <input 
        type="email" 
        {...register ('email')}
        // name="email" 
        // value={user.email} 
        // onChange={handleChange} 
        // required 
        />
        {errors.email && <p className='text-danger'>{errors.email.message}</p>}

        <label>Role</label>
        <input 
        type="text" 
        {...register ('role')}
        readOnly 
        // name="role" 
        // value={user.role} 
        // onChange={handleChange}
        />
        {errors.role && <p className='text-danger'>{errors.role.message}</p>}

        <label>Update Profile Image</label>
        <input 
        type="file" 
        {...register ('image')}
        // name="image" 
        // accept="image/*" 
        // onChange={handleFileChange} 
        />

        {user.image && typeof user.image === 'string' && (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`}
            alt="Current Profile"
            className="image-preview"
          />
        )}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
