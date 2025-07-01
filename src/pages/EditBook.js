import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../style/EditBook.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup' 
import { yupResolver } from '@hookform/resolvers/yup';

export const schema = yup.object().shape({
  title: yup.string().required(' title is required'),
  price: yup.number()
  .typeError('price must be a number')
  .required(' price is required')
  .positive()
  .min(1),
  authorname: yup.string()
  .required(' authorname is required'),
  description: yup.string()
  .required(' Description is required'),
  category: yup.string()
  .required('Category is required'),
  stock: yup
  .number()
  .required('Stock is required')
  .typeError('stock must be a number')
  .min(0),

  //img is optional
  image: yup
    .mixed()
    .test("fileType", "Only jpg, jpeg or png files are allowed", (value) => {
      if (!value || value.length === 0) return true; // allow no image
      return ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type);
    }),

})

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [book, setBook] = useState({
    // title: '',
    // image: '',
    // authorname: '',
    // description: '',
    // price: '',
    // stock: '',
    // category: ''
  });

  const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm({
    resolver: yupResolver(schema),})

  useEffect(() => {
    api.get(`/books/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const data = res.data.data
      setBook(data);

      // reset(data)

    setValue("title", data.title);
    setValue("authorname", data.authorname);
    setValue("description", data.description);
    setValue("price", data.price);
    setValue("stock", data.stock);
    setValue("category", data.category);
    })
    .catch((error) => {
      console.error('Error fetching book:', error);
    });
  }, [id, token]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setBook((prevBook) => ({
  //     ...prevBook,
  //     [name]: value
  //   }));
  // };

  // const handleFileChange = (e) => {
  //   setBook((prevBook) => ({
  //     ...prevBook,
  //     image: e.target.files[0]
  //   }));
  // };

  const handleSubmitButton= (data) => {
  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("authorname", data.authorname);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    api.patch(`/books/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      alert("✅ Book updated successfully!");
      navigate(`/book/${id}`);
    })
    .catch((error) => {
      console.error("Error updating book:", error);
    });
  };

  
  

  return (
  <div className='editbook'>
    <div className="edit-book-container">
      <h2>Edit Book</h2>
      <form className="edit-book-form" onSubmit={handleSubmit(handleSubmitButton)} encType="multipart/form-data">
        <label>Title</label>
        <input 
        type="text" 
        {...register ('title')}
        // name="title" 
        // value={book.title} 
        // onChange={handleChange} 
        />
         {errors.title && <p className="text-danger">{errors.title.message}</p>}

        <label>Author Name</label>
        <input 
          type="text"
          {...register ('authorname')}
          // name="authorname" 
          // value={book.authorname} 
          // onChange={handleChange} 
          />
           {errors.authorname && <p className="text-danger">{errors.authorname.message}</p>}

        <label>Description</label>
        <input 
        type="text" 
        {...register ('description')}
        // name="description" 
        // value={book.description} 
        // onChange={handleChange} required
         />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}

        <label>Price (₹)</label>
        <input 
        type="number" 
        {...register ('price')}
        // name="price" 
        // value={book.price} 
        // onChange={handleChange} required 
        />
         {errors.price && <p className="text-danger">{errors.price.message}</p>}

        <label>Stock</label>
        <input 
        type="number" 
        {...register ('stock')}
        // name="stock" 
        // value={book.stock} 
        // onChange={handleChange} required 
        />
         {errors.stock && <p className="text-danger">{errors.stock.message}</p>}

       <label>Category</label>
       <select
        {...register('category')}
        className="form-select"
       >
        <option value="">Select Category</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-fiction">Non-fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Comics">Comics</option>
        <option value="Education">Education</option>
        <option value="Biography">Biography</option>
        <option value="Science">Science</option>
        <option value="Other">Others</option>
       </select>
       {errors.category && <p className="text-danger">{errors.category.message}</p>}


        <label>Update Cover Image</label>
        <input 
        type="file" 
        accept="image/*" 
        {...register ('image')}
        // name="image" 
        // onChange={handleFileChange} 
        />
         {errors.image && <p className="text-danger">{errors.image.message}</p>}

        {book.image && typeof book.image === 'string' && (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${book.image}`}
            alt="Current Cover"
            className="image-preview"
          />
        )} 

        <button type="submit">Update Book</button>
      </form>
    </div>
  </div>
  );
};

export default EditBook;
