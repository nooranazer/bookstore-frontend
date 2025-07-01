


import React, { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([])

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role
  const navigate = useNavigate()

  useEffect(() => {
    fetchBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchBooks = async () => {
    await api.get('/books/list', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setBooks(res.data.data)
      })
      .catch((err) => {
        alert("Error fetching books:")
      })
  }

  return (
    <>
    <div className="viewpage">

    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
       <div className="text-center mb-4">
          <h2 className="fw-bold text-light">📖 Welcome to BookHive</h2>
           <p className="text-muted">Find your next great read from our curated collection.</p>
        </div>
        {role === 'seller' && (
          <button
            className="btn btn-primary"
            onClick={() => navigate('/add')}
          >
            + Add Book
          </button>
        )}
      </div>

      {books.length === 0 ? (
        <p className="text-center text-muted">No books found</p>
      ) : (
        <div className="row">
          
          {books.map((book) => (
            <div className="col-md-4 mb-4" key={book._id}>
              <Link to={`/book/${book._id}`}>
              <div className="card shadow-sm h-100">
      
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${book.image}`}
                  className="card-img-top"
                  alt={book.title}
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                  }}
                />
               
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.authorname} <br />
                    <strong>Price:</strong> ₹{book.price}
                  </p>
                </div>
              </div>
              </Link>
            </div>
          ))}
           
        </div>
      )}
    </div>
    </div>
    </>

  )
}

export default BookList
