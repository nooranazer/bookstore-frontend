import React  from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import  '../style/AddBooks.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

 export const schema = yup.object().shape({
  title: yup.string().required(' title is required'),
  price: yup.number()
  .required('price is required')
  .typeError("Must be a number")
  .positive()
  .min(1),
  rating: yup.number()
  .typeError("Must be a number")
  .min(0)
  .max(5,'0-5'),
  authorname: yup.string()
  .required(' authorname is required'),
  description: yup.string()
  .required(' Description is required'),
  category: yup.string()
  .required('Category is required'),
  stock: yup.number().required('Stock is required').typeError("Must be a number").min(0),
  image: yup.mixed()
  // .required('Image is required')
  .test('required', 'Image is required', (value) => {
    return value && value.length > 0;
  })  
  .test('fileType','Unsupported file type',(value) => {
    if (!value || value.length === 0) return true; // No file selected yet, let .required handle it
    return value && value.length && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
  })

})
const AddBook = () => {
  // const [book, setBook] = useState({
  //   title: '',
  //   image: null,
  //   authorname: '',
  //   description: '',
  //   price: '',
  //   stock: '',
  //   rating: '',
  //   category: ''
  // });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   setBook({ ...book, [name]: type === 'file' ? files[0] : value });
  // };

  const handleSubmitButton = async (data) => {
    

    const formData = new FormData(); 
    formData.append('title', data.title);
    formData.append('image', data.image[0]);
    formData.append('authorname', data.authorname);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    formData.append('rating', data.rating);
    formData.append('category', data.category);

    try {
      await api.post('/books/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      alert('Book added successfully');
      navigate('/list'); 
    } catch (error) {
      console.error(error);
      alert('Failed to add book');
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
});

  return (
  <div>
  <div className="add-book-container mt-5 p-4 rounded shadow bg-light">
    <h2 className="mb-4 text-primary">📚 Add New Book</h2>
    <form onSubmit={handleSubmit(handleSubmitButton)}>
    
      <div className="mb-3">
        <label className="form-label">📘 Title</label>
        <input
        type="text"
        {...register('title')}
        // name="title"
        // onChange={handleChange}
         className="form-control" />
         {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>

      
      <div className="mb-3">
        <label className="form-label">🖼️ Upload Image</label>
        <input 
         type="file" 
        {...register('image')} className="form-control" />
        {errors.image && <p className="text-danger">{errors.image.message}</p>}

         {/* name="image" 
         onChange={handleChange} */}
      </div>

      
      <div className="mb-3">
        <label className="form-label">✍️ Author Name</label>
        <input 
        type="text" 
        {...register('authorname')}className="form-control" />
        {errors.authorname && <p className="text-danger">{errors.authorname.message}</p>}
        {/* name="authorname" 
        onChange={handleChange}  */}
      </div>

      
      <div className="mb-3">
        <label className="form-label">📄 Description</label>
        <textarea 
        {...register('description')} className="form-control" rows="3" />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}

        {/* name="description"
        onChange={handleChange}  */}
      </div>

     
      <div className="mb-3">
        <label className="form-label"> Price</label>
        <input 
        type="number"
        // name="price" 
        // onChange={handleChange} 
        {...register('price')}className="form-control" />
        {errors.price && <p className="text-danger">{errors.price.message}</p>}

      </div>

     
      <div className="mb-3">
        <label className="form-label"> Stock</label>
        <input 
        type="number"
        // name="stock" 
        // onChange={handleChange} 
        {...register('stock')}className="form-control" />
        {errors.stock && <p className="text-danger">{errors.stock.message}</p>}

      </div>

      
      <div className="mb-3">
        <label className="form-label"> Rating (0-5)</label>
        <select 
        // name="rating" 
        // onChange={handleChange} 
        {...register('rating')}className="form-select">
          <option value="">Select Rating</option>
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {errors.rating && <p className="text-danger">{errors.rating.message}</p>}

      </div>

      
      <div className="mb-4">
        <label className="form-label"> Category</label>
        <select
        //  name="category" 
        //  onChange={handleChange} 
         {...register('category')}className="form-select">
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
      </div>

      <button type="submit" className="btn btn-success w-100">➕ Add Book</button>
    </form>
  </div>
  </div>
);

};

export default AddBook;
