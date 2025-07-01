import React, { useEffect, useState } from 'react';
import {  Link, useParams } from 'react-router-dom';
import api from '../api';
import '../style/ViewBook.css'

const ViewBook = () => {
  const token = localStorage.getItem('token')
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role
  const [book, setBook] = useState(null);

const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this book?");
  
  if (!confirmDelete) {
    return; // If user clicks "Cancel" stop here
  }

  api.delete(`/books/delete/${id}`)
    .then((res) => {
      alert('Book deleted');
      setBook(null);
    })
    .catch((err) => {
      alert('Failed to delete');
      console.error(err);
    });
};

  useEffect(() => {
    viewedBook()  
     // eslint-disable-next-line 
  }, [id]);

  const viewedBook = async () => {
      await api.get(`/books/view/${id}`,{
        headers: {
        Authorization: `Bearer ${token}`
      }
      })
       
      .then((res) => {
        setBook(res.data.data);
      })
      
      .catch((err) => {
        console.error('Error loading book:', err);
      });
  }
 
  if (!book) {
    return <p className="p-4 text-center text-muted">Loading...</p>;
  }

  return (
    <div className="container mt-5">
    <div className="card shadow p-4 position-relative">
    
    <div className="row align-items-center">
      <div className="col-md-5 text-center">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${book.image}`} 
          alt={book.title}
          className="img-fluid rounded"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
      </div>

      <div className="col-md-7">
        <h2 className="mb-3">{book.title}</h2>
        <h4 className="text-success mb-2">₹{book.price}</h4>
        <p className="mt-3">{book.description}</p>
        <h5 className="mb-3">Available Stock: {book.stock}</h5>
        <p><strong>Author:</strong> {book.authorname}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p className="text-muted">Rating: {book.rating ?? 'N/A'}</p>
      </div>
    </div>

    {role === 'seller' && (
      <div className="view-buttons-bottom">
        <Link to={`/edit/${book._id}`}>
          <button className="btn-edit">Edit</button>
        </Link>
        <button className="btn-delete" onClick={() => handleDelete(book._id)}>Delete</button>
      </div>
    )}

  </div>
</div>

  );
};

export default ViewBook;
