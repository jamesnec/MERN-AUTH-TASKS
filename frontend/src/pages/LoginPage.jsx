import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function LoginPage() {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if(isAuthenticated){
      navigate("/tasks")
    }
  }, [isAuthenticated]);

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

        {signinErrors.map((error, i) => (
            <p className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-sm mb-1" key={i}>{error}</p>
        ))}
        <h1 className='text-2xl font-bold my-2'>Login</h1>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" 
            {...register("email", { 
                required: {
                    value: true,
                    message: "Email is required"
                }
            })} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-full my-2" 
            placeholder='Email' />
            {errors.email && (<p className='text-red-500'>{errors.email.message}</p>)}

            <input type="password" name="password" 
            {...register("password", { 
                required: {
                    value: true,
                    message: "Password is required"
                }
            })} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-full my-2" 
            placeholder='Password' />
            {errors.password && (<p className='text-red-500'>{errors.password.message}</p>)}

            <button type='submit' className='bg-indigo-400 px-4 py-2 rounded-md my-3'>Login</button>
        </form>

        <p className='flex gap-x-2 justify-between'>Don't have an account? <Link to="/register" className='text-sky-500'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default LoginPage