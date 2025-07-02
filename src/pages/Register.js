import React  from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Register.css' // custom CSS file for styling
import api from '../api'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const schema = yup.object().shape({
  username: yup.string()
    .required('Username is required'),

  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  role: yup.string()
    .oneOf(['buyer', 'seller', 'admin'], 'Invalid role')
    .required('Role is required'),

 image: yup
  .mixed()
  .test('required', 'Image is required', value => value && value.length > 0)
  .test('fileType', 'Only jpg, jpeg, or png files are allowed', (value) => {
    if (!value || value.length === 0) return false;
    return ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0]?.type);
  }),

});


const Register = () => {
  // const [username, setUsername] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [role, setRole] = useState('buyer')
  // const [image, setImage] = useState(null)
  const navigate = useNavigate()


const handleSubmitButton = async (data) => {
 

  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('role', data.role);
  formData.append('image', data.image[0]); 
;


    api.post('/auth/register', formData)
    .then((res) => {
     alert('Registration successful');
     reset();
     
     const { token, data} = res.data;
     
     if (token) {
        localStorage.setItem('token', token);

        if (data) {
          localStorage.setItem('user', JSON.stringify(data)); 
        }

        navigate('/list');
      } else {
        alert('Login failed: Token missing');
      }
    })
    .catch ((err) => {
    console.error('Error registering user:', err);
    alert('Registration failed');
  })
};

 const { register, handleSubmit, reset, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
});


  return (
    <div className='register'>
      <div className='container register-form p-4 rounded'>
        <h3 className='text-center mb-4 text-white'>REGISTER HERE</h3>
        <form onSubmit={handleSubmit(handleSubmitButton)}>
          <div className="mb-3">
            <input
              type='text'
              className='form-control'
              placeholder='Username'
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              // required
              {...register ('username')}
            />
            {errors.username && <p className='text-danger'>{errors.username.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type='email'
              className='form-control'
              placeholder='Email'
                {...register ('email')}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              // required
            />
            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
          </div>
          <div className="mb-3">
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              {...register ('password')}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // required
            />
            {errors.password && <p className='text-danger'>{errors.password.message}</p>}

          </div>
          <div className="mb-3">
            <input
              type='file'
              className='form-control'
              {...register ('image')}
              // onChange={(e) => setImage(e.target.files[0])}
              // required
            />
            {errors.image && <p className='text-danger'>{errors.image.message}</p>}
          </div>
          <div className="mb-3">
          <select className="form-select" {...register('role')}>
              <option value="">Select role</option> {/* ✅ Force selection */}
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
          </select>

            {errors.role && <p className='text-danger'>{errors.role.message}</p>}
          </div>
          <button type='submit' className='btn btn-primary w-100'>Submit</button>

          <p>Already have an account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register
