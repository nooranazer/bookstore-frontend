
import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar';
import BookList from './pages/BookList';
import Login from './pages/Login';
import Register from './pages/Register';
import ViewBook from './pages/ViewBook';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import ViewProfile from './pages/ViewProfile';
import EditProfile from './pages/EditProfile';
import PrivateRoute from './middlewares/PrivateRoute';
import PublicRoute from './middlewares/PublicRoute';



function App() {
  return (
    <div className="App">
      <Appbar/>
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <Login/>
             </PublicRoute>
          }/>
          <Route path='/register' element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          }/>
          <Route path='/list' element={
            <PrivateRoute>
              <BookList/>
            </PrivateRoute>
          }/>
          <Route path='/book/:id' element={
            <PrivateRoute>
              <ViewBook/>
            </PrivateRoute>
          }/>
          <Route path='/add' element={
            <PrivateRoute>
              <AddBook/>
            </PrivateRoute>
          }/>
          <Route path='/edit/:id' element={
            <PrivateRoute>
              <EditBook/>
            </PrivateRoute>
          }/>
          <Route path='/viewprofile' element={
            <PrivateRoute>
              <ViewProfile/>
            </PrivateRoute>
          }/>
          <Route path='/editprofile' element={
             <PrivateRoute>
              <EditProfile/>
            </PrivateRoute>
          }/>
        </Routes>
      
    </div>
  );
}

export default App;
