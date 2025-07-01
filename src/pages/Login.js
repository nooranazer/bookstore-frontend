import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../api';
import '../style/Login.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

export const schema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup
  .string()
  .required('password is required')
  //.min(6, 'Password must be at least 6 characters')
  
})

export const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const navigate = useNavigate();

   const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optional: navigate('/list');
    }
  }, [navigate]);

  const handleSubmitButton = (data) => {
    api.post('/auth/', {
      email: data.email,
      password: data.password
    })
    .then((res) => {

      const { token, data: user } = res.data; 

      if (token) {
        localStorage.setItem('token', token);

        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); 
        } else {
          localStorage.removeItem('user');
          console.warn("User data missing from response.");
        }

        alert('Login successful');
        navigate('/list');
      } else {
        alert('Login failed: Token missing');
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      alert("Invalid credentials");
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(handleSubmitButton)}>
          <input
            type="email"
            placeholder="Email"
            {...register ('email')}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            // required
          />
           {errors.email && <p className='text-danger'>{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register ('password')}
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            // required
          />
           {errors.password && <p className='text-danger'>{errors.password.message}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
